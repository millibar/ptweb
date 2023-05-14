'use strict';

function ensure(req, res, next) {
  console.log('authenticationEnsurer:');
  console.log(`  ${JSON.stringify(req.session)}`);
  if (req.isAuthenticated()) { return next(); }
  res.json({ status: 'NG', message: 'ログインしていないユーザーからの要求を無視しました' });
  // res.redirect('/');
}

module.exports = ensure;