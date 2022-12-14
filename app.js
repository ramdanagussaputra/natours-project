const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const reviewsRouter = require('./routes/reviewRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const bookingController = require('./controller/bookingController');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');

// GLOBAL MIDDLEWARE
app.use(cors());
app.options('*', cors());

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://cdn.jsdelivr.net https://js.stripe.com https://cdn.maptiler.com"
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "style-src 'self' https://fonts.googleapis.com https://cdn.maptiler.com"
  );
  next();
});

app.use(helmet.crossOriginEmbedderPolicy({ policy: 'credentialless' }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request on the same IP, please try again in 1 hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'name',
      'duration',
      'maxGroupSize',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
    ],
  })
);

app.use(compression());

// app.use((req, res, next) => {
//   req.requestedTime = new Date().toISOString();

//   next();
// });

// ROUTES
app.use('/', viewsRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/booking', bookingRouter);

// ERROR HANDLE
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can not find ${req.originalUrl}. this router is not exist in this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
