const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User must have an email'],
    validate: [validator.isEmail, 'Please input a valid email'],
    lowercase: true,
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'guide', 'lead-guide'],
      message:
        'Invalid roles input, roles must be one of "user, admin, guide, lead-guide"',
    },
    default: 'user',
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (doc) {
        return doc === this.password;
      },
      message: 'Should be the same as password',
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// prettier - ignore;
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });

  next();
});

userSchema.methods.checkPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (!this.passwordChangeAt) return false;

  const timePassword = this.passwordChangeAt.getTime() / 1000;

  return JWTTimestamp < timePassword;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
