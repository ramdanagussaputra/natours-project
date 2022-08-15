const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRoutes);

// prettier-ignore
router
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.tourDistances)

// prettier-ignore
router
  .route('/tourWithin/:distance/center/:latlng/unit/:unit')
  .get(tourController.tourWithin);

// prettier-ignore
router
    .route('/top-5-cheap')
    .get(tourController.aliasTopCheap, tourController.getAllTour)

// prettier-ignore
router
    .route('/tours-stats')
    .get(tourController.stats)

// prettier-ignore
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'guide', 'lead-guide'),
    tourController.getMonthlyPlan
  );

// prettier-ignore
router
  .route('/')
  .get(tourController.getAllTour)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

// prettier-ignore
router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeImagesTour,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
