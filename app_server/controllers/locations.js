// Mock locations data
const locations = 
[{
  name: 'El panal',
  address: 'Cualquier Address, 100, Carabobo, Venezuela',
  rating: 3,
  facilities: ['Hot Drinks', 'Wifi', 'Food'],
  distance: '100m',
  opening: ['Monday - Friday : 7:00am - 7:00pm', 
            'Saturday : 8:00am - 5:00pm', 
            'Sunday : closed'],
  reviews: [{
    rating: 2,
    author: "Charlie Chaplin",
    date: "14 February 2017",
    review: "It was okay. Coffee wasn't great."
  }, {
    rating: 3,
    author: "Buster Keaton",
    date: "14 February 2019",
    review: "Nice!"
  }],
}, {
  name: 'Il Dolce',
  address: 'Cualquier Address, 101, Carabobo, Venezuela',
  rating: 5,
  facilities: ['Hot Drinks', 'Food'],
  distance: '200m',
  opening: ['Monday - Friday : 7:00am - 7:00pm', 
            'Saturday : 8:00am - 5:00pm', 
            'Sunday : closed'],
  reviews: [{
    rating: 2,
    author: "Charlie Chaplin",
    date: "14 February 2017",
    review: "It was okay. Coffee wasn't great."
  }, {
    rating: 3,
    author: "Buster Keaton",
    date: "14 February 2019",
    review: "Nice!"
  }],
}, {
  name: 'Patisserie',
  address: 'Cualquier Address, 100, Carabobo, Venezuela',
  rating: 1,
  facilities: ['Wifi', 'Food'],
  distance: '500m',
  opening: ['Monday - Friday : 7:00am - 7:00pm', 
            'Saturday : 8:00am - 5:00pm', 
            'Sunday : closed'],
  reviews: [{
    rating: 2,
    author: "Charlie Chaplin",
    date: "14 February 2017",
    review: "It was okay. Coffee wasn't great."
  }, {
    rating: 3,
    author: "Buster Keaton",
    date: "14 February 2019",
    review: "Nice!"
  }],
}];

const setLocation = function(selected) {
  return locations.find((loc) => { return loc.name === selected; });
};

const homeList = function(req, res) {
  res.render('locations-list', 
    {
      title: 'Loc8r - Find a place to work with wifi',
      pageHeader: {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!',
      },
      locations: locations,
      setLocation: setLocation,
    });
};

const locationInfo = function(req, res) {
  res.render('location-info', {place: setLocation(req.params.name)});
};

const addReview = function(req, res) {
  res.render('location-review-form', 
                      {
                          title: 'Add Review', 
                          place: req.params.name,                                                });
};

module.exports = {
  homeList,
  locationInfo,
  addReview,
};
