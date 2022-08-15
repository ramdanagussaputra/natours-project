const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review cannot be empty'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be more or equal to 1'],
    max: [5, 'Rating must be less or equal to 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

reviewSchema.index({ user: 1, tour: 1 }, { unique: true });

reviewSchema.statics.calcRatingAverage = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length === 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });

    return;
  }

  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating,
  });
};

reviewSchema.pre(/^find/, function (next) {
  this.select('-__v').populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.post('save', (doc, next) => {
  doc.constructor.calcRatingAverage(doc.tour);

  next();
});

reviewSchema.post(/^findOneAnd/, (doc, next) => {
  doc.constructor.calcRatingAverage(doc.tour);

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
