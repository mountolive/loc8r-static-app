const request = require('request');

const apiOpts = {
  server: 'http://localhost:3000/api',
};

if(process.env.NODE_ENV === 'production')
  apiOpts.server = 'https://safe-crag-43305.herokuapp.com/';

module.exports = {
  request,
  apiOpts,
};
