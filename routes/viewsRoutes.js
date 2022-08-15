const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const router = express.Router();

router.get(
  '/',
  authController.isLoggin,
  bookingController.bookTour,
  viewsController.getOverview
);
router.get('/tour/:slug', authController.isLoggin, viewsController.getTour);
router.get('/login', authController.isLoggin, viewsController.getLogin);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTour);

module.exports = router;
