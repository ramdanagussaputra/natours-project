const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../model/tourModel');
const Booking = require('../model/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.createProduct = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) throw new AppError('Tour does not exist', 404);

  req.productStripe = await stripe.products.create({
    name: tour.name,
    description: tour.summary,
    images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
  });

  next();
});

exports.createPrice = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  if (!tour) throw new AppError('Tour does not exist', 404);

  req.priceStripe = await stripe.prices.create({
    unit_amount: tour.price * 100,
    currency: 'usd',
    product: req.productStripe.id,
  });

  next();
});

exports.createSessions = catchAsync(async (req, res, next) => {
  // Find tour
  const tour = await Tour.findById(req.params.tourId);

  // Create season
  const sessions = await stripe.checkout.sessions.create({
    // prettier-ignore
    success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user._id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    mode: 'payment',
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: req.priceStripe.id,
        quantity: 1,
      },
    ],
  });

  // Send season
  res.status(200).json({
    status: 'success',
    sessions,
  });
});

exports.bookTour = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!(tour && user && price)) return next();

  await Booking.create({
    tour,
    user,
    price,
  });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = factory.create(Booking);
exports.getBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
