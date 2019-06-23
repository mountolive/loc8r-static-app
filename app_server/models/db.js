const mongoose = require('mongoose');

const env = process.env;
const user = env.LOC8R_USERNAME; 
const pass = env.LOC8R_PASSWORD;
const db = env.LOC8R_DATABASE;

const conn = mongoose.connection;

const  createCleanUrl = () => {
  const host = env.LOC8R_HOST;
  if(host in ['127.0.0.1', 'localhost']) {
    const port = env.LOC8R_PORT ? env.LOC8R_PORT : 27017;
    return ['mongodb', `${host}:${port}/${db}`];
  }

  return ['mongodb+srv', `${host}/${db}?retryWrites=true&w=majority`];
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

require('./location');
