const resolveError = (res, err) => {
  res.render('error', {error: err.message, message: 'Ups! an error occurred'});
  console.log(err.stack);
};

module.exports = resolveError;
