const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      error: err,
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }

  // WEBSITE
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    message: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error(`ERROR 🤯`, err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      message: err.message,
    });
  }

  console.error(`ERROR 🤯`, err);
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    message: 'Please try again later',
  });
};

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 404);

const handleDuplicateErrorDB = (err) =>
  new AppError(
    `Duplicate value of ${err.keyValue.name}. Please try another name`,
    400
  );

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((errObj) => errObj.message)
    .join('. ');

  return new AppError(`Invalid input: ${message}`, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please login again', 401);

const handleJWTExpiresError = () =>
  new AppError('Token expires, please login again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name;
    error.code = err.code;
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    // prettier-ignore
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiresError();

    sendErrorProd(error, req, res);
  }
};
