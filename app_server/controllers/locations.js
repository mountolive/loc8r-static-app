const homeList = function(req, res) {
  res.render('locations-list', {title: 'Home'});
};

const locationInfo = function(req, res) {
  res.render('location-info', {title: 'Locations'});
};

const addReview = function(req, res) {
  res.render('location-review-form', {title: 'Add Review'});
};

module.exports = {
  homeList,
  locationInfo,
  addReview,
};
