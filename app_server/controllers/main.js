const index = function(req, res, next) {
  res.render('index', {title: 'Loc8r'});
};

module.exports = {
  index,
};
