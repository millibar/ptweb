const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');

/* GET 設定 page. */
router.get('/', function(req, res, next) {

  res.render('setting', { title: 'Setting', user: req.user });

});


/* ログイン状態確認用Web API */
router.post('/authenticate', authenticationEnsurer, (req, res, next) => {
  console.log(`${req.user.username}でサインインしています`);
  res.json({ status: 'OK', user: req.user });
});



module.exports = router;
