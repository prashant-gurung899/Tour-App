const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

//ROUTES
//chaining all the route handlers rather than calling everyone each at a time
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
