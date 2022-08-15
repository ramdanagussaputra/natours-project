const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.setFilterTour = (req, res, next) => {
  req.filterTour = {};
  if (req.params.tourId) req.filterTour.tour = req.params.tourId;

  next();
};

exports.getReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find(req.filterTour);

  res.status(201).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.create(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
