const ReviewService = require('../services/reviews');
const errors = require('../handlers/error-codes');
const success = require('../handlers/success-codes');
const service = new ReviewService();

const createOne = (req, res, next) => {
  service.create(res, next, 
                 req.params.locationid,
                 req.body, success.createdDoc,
                 errors.generalError);
};

const readOne = (req, res, next) => {
  service.findById(res, next, req.params.locationid,
                   req.params.reviewid,
                   success.foundOrUpdated,
                   errors.generalError);

};

const updateOne = (req, res, next) => {
  service.updateById(res, next, req.params.locationid,
                     req.params.reviewid, req.body,
                     success.foundOrUpdated, errors.generalError);

};

const deleteOne = (req, res, next) => {
  service.removeById(res, next, req.params.locationid,
                     req.params.reviewid, req.body,
                     success.deletedDoc, errors.generalError);
};

module.exports = {
  createOne,
  readOne,
  updateOne,
  deleteOne,
};
