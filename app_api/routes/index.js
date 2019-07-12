const express = require('express');
const locationsController = require('../controllers/locations');
const reviewsController = require('../controllers/reviews');
const router = express.Router();

// LOCATIONS
router
  .route('/locations')
  .get(locationsController.listByDistance)
  .post(locationsController.createOne);

router
  .route('/locations/:locationid')
  .get(locationsController.readOne)
  .put(locationsController.updateOne)
  .delete(locationsController.deleteOne);

// REVIEWS
router
  .route('/locations/:locationid/reviews')
  .post(reviewsController.createOne);

router
  .route('/locations/:locationid/reviews/:reviewid')
  .get(reviewsController.readOne)
  .put(reviewsController.updateOne)
  .delete(reviewsController.deleteOne);

module.exports = router;
