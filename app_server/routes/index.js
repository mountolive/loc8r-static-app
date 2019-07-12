const express = require('express');
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');
const router = express.Router();

/* LOCATIONS ROUTES */
router.get('/', locationsController.homeList);
router.get('/locations/:id', locationsController.locationInfo);
router.route('/locations/review/new/:id')
      .get(locationsController.addReview)
      .post(locationsController.createReview);

/* OTHERS ROUTES */
router.get('/about', othersController.about);

module.exports = router;
