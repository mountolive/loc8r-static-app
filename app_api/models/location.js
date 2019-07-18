const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true,
  },
  // Use number of minutes from midnight: ex. 7:40am -> 7*60 + 40
  opening: Number,
  closing: Number,
  closed: {
    type: Boolean,
    required: true,
  }
});

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    'default': Date.now,
    required: true,
  },
  reviewText: String,
});

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  rating: {
    type: Number, 
    'default': 0,
    min: 0,
    max: 5
  },
  facilities: [String],
  coords: {
    type: {type: String},
    coordinates: [Number],
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
});

locationSchema.index({coords: '2dsphere'});
// Compiling the schema to a model
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
