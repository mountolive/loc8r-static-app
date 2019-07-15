const request = require('../config/config').request;

class BaseService {
  constructor() {
  }

  makeRequest(reqOptions, error, success) {
    request(reqOptions, (err, res, body) => {
      if(err) error(res, err);
      else if([200, 201, 204].includes(res.statusCode)) success(body);
      else if(res.statusCode === 404) {
        error(res, {status: 404, stack: 'No documents found'});
      }
    });
  }

}

module.exports = BaseService;
