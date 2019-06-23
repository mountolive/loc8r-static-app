const mongoose = require('mongoose');

const openingTimeSchema = mongoose.Schema({
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

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  author: String,
  date: {
    type: Date,
    'default': Date.now,
  },
  review: String,
});

const locationSchema = mongoose.Schema({
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
    type: String,
    coordinates: [Number],
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
});

locationSchema.index({coords: '2dsphere'});
// Compiling the schema to a model
mongoose.model('Location', locationSchema);
