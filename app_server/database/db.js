const mongoose = require('mongoose');

const env = process.env;
const user = env.LOC8R_USERNAME; 
const pass = env.LOC8R_PASSWORD;
const db = env.LOC8R_DATABASE;
const nEnv = env.NODE_ENV;

const conn = mongoose.connection;

const  createCleanUrl = () => {
  let host = env.LOC8R_HOST;
  // we have only production and development
  if(nEnv) {
    host = env.LOC8R_REMOTE_HOST;
    return ['mongodb+srv', `${host}/${db}?retryWrites=true&w=majority`];
  }

  const port = env.LOC8R_PORT ? env.LOC8R_PORT : 27017;
  return ['mongodb', `${host}:${port}/${db}`];
};

const [protocol, cleanUrl] = createCleanUrl();

const dbURI = `${protocol}://${user}:${pass}@${cleanUrl}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// BASIC MESSAGES
conn.on('connected', () => {
  console.log(`Mongoose connected to ${cleanUrl}`);
});
conn.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});
conn.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// SHUTDOWN
const gracefulShutdown = (msg, callback) => {
  conn.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// TERMINATION
const _termination = (msg) => { 
  gracefulShutdown(msg, () => { process.exit(0); });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  _termination('app termination');
});

process.on('SIGTERM', () => {
  _termination('Heroku app shutdown');
});

require('../models/location');
