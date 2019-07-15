const mongoose = require('mongoose');

class BaseService {
  constructor(model) {
    if(!(model.prototype instanceof mongoose.Model))
      throw new TypeError("You must pass a model as argument");
    this.model = model;
  }

  findById(res, next, id, success, error) {
    this._findQuery(res, next, 'findById', error, success, id); 
  }

  findAll(res, next, success, error) {
    this._findQuery(res, next, 'find', error, success); 
  }

  create(res, next, payload, success, error) {
    this._createQuery(res, next, error, success, payload); 
  }

  updateById(res, next, id, payload, success, error) {
    this._findAndExecQuery(res, next, 'findByIdAndUpdate', error, 
                           success, id, payload); 
  }

  removeById(res, next, id, success, error) {
    this._findAndExecQuery(res, next, 'findByIdAndRemove', error, 
                           success, id); 
  }

  _findQuery(res, next, methodName, error, success, posId) {
    try {
    this.model[methodName](posId)
        .exec((err, doc) => {
          if(err) error(res, err);
          else success(res, doc);
        });
    catch(err) {
      console.log(`Error happens here ${err}`);
    }
  }

  _createQuery(res, next, error, success, args) {
    this.model.create(args, (err, doc) => {
      if(err) error(res, err);
      else success(res, doc);
    });
  }

  _findAndExecQuery(res, next, methodName, error, success, id, payload) {
    if(methodName === 'findByIdAndUpdate' && !payload) {
      return error(res, new Error(`You need to pass a payload(body) 
                                   to update`));
    }
    this.model[methodName](id, payload)
        .exec((err, doc) => {
          if(err) error(res, err);
          else success(res, doc);
        });
  }
}

module.exports = BaseService;
