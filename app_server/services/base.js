const request = require('../config/config').request;

class BaseService {
  constructor() {
  }

  makeRequest(reqOptions, error, success) {
    request(reqOptions, (err, res, body) => {
      if(err) error(err);
      else if([200, 201, 204].includes(res.statusCode)) success(body);
      else error(new Error('An unknown error occurred'));
    });
  }

}

module.exports = BaseService;
