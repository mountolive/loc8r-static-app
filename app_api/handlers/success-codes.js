const notFound = require('./error-codes').notFound;

const foundOrUpdated = (res, doc) => {
  if(doc) res.status(200).json(doc);
  else notFound(res); 
};

const createdDoc = (res, doc) => {
  res.status(201).json(doc);
};

const deletedDoc = (res, doc) => {
  if(doc) res.status(204).json(true);
  else notFound(res);
};

module.exports = {
  foundOrUpdated,
  createdDoc,
  deletedDoc,
};
