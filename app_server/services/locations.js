const BaseService = require('./base');
const api = require('../config/config').apiOpts.server;

class LocationService extends BaseService {
  constructor() {
    super();
    this.baseUri = `${api}/locations`;
  }

  listByDistance(lat, lng, maxDistance, error, success) {
    //TODO: Remove. For testing purposes
    [lng, lat, maxDistance] = [-0.9690884, 51.455041, 2000000];
    const reqOptions = {
      url: this.baseUri,
      method: 'GET',
      json: {},
      qs: {
        lat: lat,
        lng: lng,
        maxDistance: maxDistance,
      },
    };

    this.makeRequest(reqOptions, error, success);
  }

  readOne(id, error, success) {
    const reqOptions = {
      url: `${this.baseUri}/${id}`,
      method: 'GET',
      json: {},
      qs: {},
    };

    this.makeRequest(reqOptions, error, success);
  }
}

module.exports = LocationService;
