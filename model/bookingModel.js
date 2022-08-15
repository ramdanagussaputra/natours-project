const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to the tour'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to the user'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have price'],
  },
  ispaid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour user',
    select: 'name',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
