const express = require('express');
const authController = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/create-season/:tourId',
  bookingController.createProduct,
  bookingController.createPrice,
  bookingController.createSessions
);

router
  .route('/')
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
