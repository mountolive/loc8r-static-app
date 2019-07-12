const notFound = (res, extraMessage) => {
  res.status(404)
     .json({
       message: `Document not found ${extraMessage}`,
     });
};

const generalError = (res, err) => {
  res.status(500)
     .json({
       message: 'An error occurred in the server',
       error: err.message,
       stackTrace: err.stack,
     });
};

module.exports = {
  notFound,
  generalError,
};
