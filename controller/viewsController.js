const Tour = require('../model/tourModel');
const Booking = require('../model/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alertMessage = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    req.locals.alert =
      "Your booking was successfull! Please check your email for a confirmation. if your booking doesn't show up here immediatly, please come back later";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  // Get Tours data
  const tours = await Tour.find();

  res.status(200).render('overview', {
    tours,
    title: 'All tour',
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  if (!tour) throw new AppError('Tour did not exist', 404);

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login');
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My Account',
  });
};

exports.getMyTour = catchAsync(async (req, res, next) => {
  const toursArr = await Booking.find({ user: req.user._id }).select(
    'tour -user -_id'
  );

  const tourIds = toursArr.map((el) => el.tour._id);

  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours,
  });
});
