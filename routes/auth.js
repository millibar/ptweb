const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');


router.get('/', authenticationEnsurer, (req, res, next) => {
  let DB_NAME = '';
  if (req.user) {
    const u = require('../myUtil');
    DB_NAME = u.twitterIdToDbName(req.user.id);
    console.log(`${req.user.id} → ${DB_NAME}`);
  }

  res.render('auth', { title: '認証成功', user: req.user, dbName: DB_NAME });

});


/* ログイン状態確認用Web API */
router.post('/', authenticationEnsurer, (req, res, next) => {
  console.log(`${req.user.username}でサインインしています`);
  res.json({ status: 'OK', user: req.user });
});

/* オンライン状態確認用Web API */
router.post('/isOnLine', (req, res, next) => {
  console.log('オンラインです');
  res.json({ status: 'OK' });
});


module.exports = router;
