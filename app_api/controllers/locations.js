const Location = require('../models/location');
const LocationService = require('../services/locations');
const errors = require('../handlers/error-codes');
const success = require('../handlers/success-codes');
const service = new LocationService(Location);

const listByDistance = async (req, res, next) => {
  service.listByDistance(req, res, next,
                         success.foundOrUpdated,
                         errors.generalError);
};

const createOne = (req, res, next) => {
  service.create(res, next, req.body, 
                 success.createdDoc, 
                 errors.generalError); 
};

const readOne = (req, res, next) => {
  service.findById(res, next, req.params.locationid, 
                   success.foundOrUpdated, 
                   errors.generalError);
};

const updateOne = (req, res, next) => {
  service.updateById(res, next, req.params.locationid, 
                     req.body, success.foundOrUpdated,
                     errors.generalError);
};

const deleteOne = (req, res, next) => {
  service.removeById(res, next, req.params.locationid, 
                     success.deletedDoc, 
                     errors.generalError);
};

module.exports = {
  listByDistance,
  createOne,
  readOne,
  updateOne,
  deleteOne,
};
