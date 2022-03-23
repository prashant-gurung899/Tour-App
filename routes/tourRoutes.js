const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

//param middleware
// router.param('id', tourController.checkID);

//ROUTES
//chaining all the route handlers rather than calling everyone each at a time
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
