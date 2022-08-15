const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

////////////////// SIGN IN JWT
const signJWT = (id) =>
  promisify(jwt.sign)({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

////////////////// VERIFY JWT
const verifyJWT = (token) =>
  promisify(jwt.verify)(token, process.env.JWT_SECRET);

////////////////// CREATE AND SEND JWT TOKEN
const createSendJWT = async (user, statusCode, req, res) => {
  const token = await signJWT(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-fowarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.isActive = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

////////////////// SIGN UP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;
  await new Email(newUser, url).sendWelcome();

  await createSendJWT(newUser, 201, req, res);
});

////////////////// LOGIN
exports.login = catchAsync(async (req, res, next) => {
  //   RETRIEVE THE USER INPUT
  const { email, password } = req.body;

  //   CHECK IF EMAIL AND PASSWORD INPUT EXIST
  if (!(email && password)) {
    throw new AppError('Provide an email and password', 400);
  }

  //   CHECK IF EMAIL AND PASSWORD CORRECT
  const user = await User.findOne({ email }).select('+password');

  if (!(user && (await user.checkPassword(password, user.password)))) {
    throw new AppError('Wrong email or password', 401);
  }

  //   SEND JWT
  await createSendJWT(user, 200, req, res);
});

////////////////// PROTECT
exports.protect = catchAsync(async (req, res, next) => {
  // CHECK IF TOKEN EXIST
  let token;
  // prettier-ignore
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) throw new AppError('Token not exist, please login fisrt');

  // VERIFY THE TOKEN
  const decoded = await verifyJWT(token);

  // CHECK IF USER STILL EXIST
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    throw new AppError('User that belong to the token no longer exist', 401);

  // CHECK IF USER CHANGE PASSWORD
  if (currentUser.changePasswordAfter(decoded.iat))
    throw new AppError('Password has change, please login again');

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

////////////////// RESTRICT
// prettier-ignore
exports.restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) throw new AppError('You are not have permission', 403)
  
  next()
}

////////////////// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // CHECK USER BY THE EMAIL
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new AppError('User does not have this email', 404);

  // CREATE RESET PASSWORD TOKEN
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  // CREATE RESET PASSWORD LINK
  const resetPasswordURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  // SEND TOKEN
  // const emailOption = {
  //   email: user.email,
  //   subject: 'Reset password token (Valid for 10 minutes)',
  //   message: `Forgot your password ? please do patch request with your password and passwordConfirm on ${resetPasswordURL}. If you do not reset your password, ignore this email`,
  // };

  try {
    await new Email(user, resetPasswordURL).sendPasswordReset();
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    throw new AppError(
      'Error when sending the email. Please try again later',
      500
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Your reset password token have sent to your email',
  });
});

////////////////// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  // CHECK THE TOKEN AND CHECK IF USER EXIST
  const resetToken = req.params.token;
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetTokenHash,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError('Token invalid or expires', 401);

  // UPDATE PASSWORD
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  //   SEND JWT
  await createSendJWT(user, 200, req, res);
});

////////////////// UPDATE PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // GET THE USER
  const user = await User.findById(req.user._id).select('+password');

  if (!user) throw new AppError('User belong to this token do not exist', 404);

  // CHECK IF USER PASSWORD CORRECT
  if (!user.checkPassword(req.body.password, user.password))
    throw new AppError('Wrong password', 402);

  // UPDATE PASSWORD
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();

  // LOGIN
  await createSendJWT(user, 200, req, res);
});

////////////////// CHECK IF LOGIN
exports.isLoggin = async (req, res, next) => {
  try {
    // CHECK IF COOKIE EXIST
    if (!req.cookies.jwt) return next();

    // VERIFY THE TOKEN
    const decoded = await verifyJWT(req.cookies.jwt);

    // CHECK IF USER STILL EXIST
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next();

    // CHECK IF USER CHANGE PASSWORD
    if (currentUser.changePasswordAfter(decoded.iat)) return next();

    res.locals.user = currentUser;
    next();
  } catch {
    return next();
  }
};

////////////////// LOGOUT
exports.logout = (req, res) => {
  res.cookie('jwt', 'logged-out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
};
