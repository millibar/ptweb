var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get /');
  let DB_NAME = '';
  if (req.user) {
    const u = require('../myUtil');
    DB_NAME = u.twitterIdToDbName(req.user.id);
    console.log(`${req.user.id} → ${DB_NAME}`);
  }

  res.render('index', { title: 'プリズナートレーニング', user: req.user, dbName: DB_NAME });

});


module.exports = router;
