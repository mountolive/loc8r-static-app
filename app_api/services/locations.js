const Location = require('../models/location');
const BaseService = require('./base');

class LocationService extends BaseService {
  constructor(model) {
    super(model);
  }

  async listByDistance(req, res, next, success, error) {
    const { lat, lng, maxDistance } = req.query;
    if(this._isAnyNaN(lat, lng, maxDistance)) {
      return error(res, new URIError(`Params must have 
                                      numerical values. 
                                      You have to pass lat, 
                                      lng and maxDistance`));
    }

    const near = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)],
    };

    const geoOptions = {
      distanceField: "distance.calculated",
      spherical: true,
      maxDistance: parseFloat(maxDistance),
      num: 10,
    };

    try {
      const results = await Location.aggregate([{
        $geoNear: {
          near,
          ...geoOptions,
        }
      }]);
      success(res, this._processLocations(results));
    } catch(err) {
      error(res, err);
    }
  }

  _processLocations(results) {
    return results.map((loc) => {
      return {
        id: loc._id,
        name: loc.name,
        address: loc.address,
        rating: loc.rating,
        facilities: loc.facilities,
        distance: loc.distance.calculated.toFixed(),
        lng: loc.coords[0],
        lat: loc.coords[1],
      };
    });
  }

  _isAnyNaN() {
    return Array.prototype.find.call(arguments, x => isNaN(parseFloat(x)));
  }
}

module.exports = LocationService;
