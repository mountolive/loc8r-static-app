const Location = require('../models/location');
const notFound = require('../handlers/error-codes').notFound;

class ReviewService {
  constructor() {
  }

  findById(res, next, locationId, reviewId, success, error) {
    this._findParentAndExec(locationId, res, error, (res, loc) => {
      success(res, {
                    location: 
                     { 
                       name: loc.name, 
                       id: loc._id 
                     },
                    review: loc.reviews.id(reviewId),
                   });
    });
  }

  create(res, next, locationId, payload, success, error) {
    this._findParentAndExec(locationId, res, error, (res, loc) => {
      loc.reviews.push(payload);
      loc = this._updateRating(loc);
      loc.save((err, doc) => {
        if(err) error(res, err);
        else success(res, doc);
      });

    });
  }

  updateById(res, next, locationId, reviewId, 
             payload, success, error) {
    this._findParentAndExec(locationId, res, error, (res, loc) => {
      const review = loc.reviews.id(reviewId);
      review.set(payload);
      loc = this._updateRating(loc);
      loc.save((err, doc) => {
        if(err) error(res, err);
        else success(res, doc);
      });
    });
  }

  removeById(res, next, locationId, reviewId, 
             payload, success, error) {
    this._findParentAndExec(locationId, res, error, (res, loc) => {
      const review = loc.reviews.id(reviewId);
      if(!review) return notFound(res, `, reviewId: ${reviewId}`);
      review.remove();
      loc = this._updateRating(loc);
      loc.save((err, doc) => {
        if(err) error(res, err);
        else success(res, doc);
      });
    });
  }

  _findParentAndExec(locationId, res, error, success) {
    Location.findById(locationId)
            .exec((err, doc) => {
              if(err) error(res, err);
              else if(!doc) notFound(res, `, id: ${locationId}`);
              else success(res, doc); 
            });
  }

  _updateRating(loc) {
    const revs = loc.reviews;
    const dRating = revs.reduce((t, x) => x.rating + t, 0) / revs.length;
    loc.rating = Math.round(dRating);
    return loc;
  }
}

module.exports = ReviewService;
