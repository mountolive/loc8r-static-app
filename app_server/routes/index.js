const express = require('express');
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');
const router = express.Router();
require('../database/db');

/* LOCATIONS ROUTES */
router.get('/', locationsController.homeList);
router.get('/locations/:id', locationsController.locationInfo);
router.get('/locations/review/new/:id', locationsController.addReview);

/* OTHERS ROUTES */
router.get('/about', othersController.about);

module.exports = router;
