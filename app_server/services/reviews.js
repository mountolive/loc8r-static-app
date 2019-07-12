const BaseService = require('./base');
const api = require('../config/config').apiOpts.server;

class ReviewService extends BaseService {
  constructor() {
    super();
    this.baseUri = `${api}/locations/:lid/reviews/`;
  }

  create(params, reqBody, error, success) {
    const {rating, author, reviewText} = reqBody;
    const locationId = params.id;

    const reqOptions = {
      url: this.baseUri.replace(':lid', locationId),
      method: 'POST',
      json: {
        rating: rating,
        author: author,
        reviewText: reviewText,
      },
      qs: {},
    };

    this.makeRequest(reqOptions, error, success);
  }
}

module.exports = ReviewService;
