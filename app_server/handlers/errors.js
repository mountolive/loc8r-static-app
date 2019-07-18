const resolveError = (res, err) => {
  const {stackTrace, message} = err.body;
  res.render('generic-text', {error: err, 
                              stackTrace,
                              message,
                              title: 'Ups! an error occurred'});
};

module.exports = resolveError;
