'use strict';

function ensure(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.json({ status: 'NG', message: 'ログインしていないユーザーからの要求を無視しました' });
  // res.redirect('/');
}

module.exports = ensure;