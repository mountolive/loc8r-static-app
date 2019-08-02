const about = function(req, res, next) {
  res.render('generic-text', {title: 'About', 
                              message: 'Loc8r is a dummy created ' + 
                                       'for educational purposes'});
};

module.exports = {
  about,
};
