const ReviewService = require('../services/reviews');
const LocationService = require('../services/locations');
const resolveError = require('../handlers/errors');
const locationService = new LocationService();
const reviewService = new ReviewService();

const homeList = function(req, res) {
  const {lat, lng, maxDistance} = req.params;
  locationService.listByDistance(lat, lng, maxDistance, 
    (err) => resolveError(res, err), 
    (locations) => {
      let message;
      if(!locations.length)
        message = "There are no places with wifi nearby your location";
      res.render('locations-list',
        {
          title: 'Loc8r - Find a place to work with wifi',
          pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!',
          },
          locations: _setDistanceLocations(locations),
          message
        });
    });
};

const locationInfo = function(req, res) {
  const id = req.params.id;
  locationService.readOne(id, 
    (err) => resolveError(res, err), 
    (loc) =>_renderLocationInfo(res, loc));
};

const addReview = function(req, res) {
  res.render('location-review-form', 
                      {
                          title: 'Add Review', 
                          id: req.params.id,
                          error: req.query.err,
                      });
};

const createReview = function(req, res) {
  const body = req.body;
  if(!(body.rating && body.author && body.reviewText))
    res.redirect(`${req.params.id}?err=val`);
  reviewService.create(req.params, req.body, 
    (err) => resolveError(res, err), 
    (loc) => _renderLocationInfo(res, loc));
};

const _renderLocationInfo = function(res, loc) {
  loc.distance = _convertDistance(loc.distance);
  res.render('location-info', {place: _setTimes(loc)});
};

const _setTimes = function(loc) {
  loc.openingTimes.filter((sch) => {
                    return !sch.closed;
                  })
                  .map((sch) => {
                    sch.opening = _convertTime(sch.opening);
                    sch.closing = _convertTime(sch.closing);
                  });
  loc.reviews = _setTimeString(loc.reviews);
  return loc;
};

const _setDistanceLocations = function(locations) {
  return locations.map((l) => {
    l.distance = _convertDistance(l.distance);
    return l;
  });
};

const _convertTime = function(mins) {
  const extra = mins % 60;
  return `${(mins - extra) / 60}:${extra > 9 ? extra : extra + "0"}`;
};

const _convertDistance = function(distance) {
  if(distance > 1000) {
    distance = (distance / 1000) >>> 0;
    return distance + 'km';
  } else {
    return distance + 'm';
  }
};

const _setTimeString = function(reviews) {
  return reviews.map(r => {
    r.date = new Date(r.date);
    r.date = `${r.date.getFullYear()}-${r.date.getMonth()}-${r.date.getDate()}`; 
    return r;
  });
};

module.exports = {
  homeList,
  locationInfo,
  addReview,
  createReview,
};
