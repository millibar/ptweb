const express = require('express');
const router = express.Router();

/* GET 設定 page. */
router.get('/', function(req, res, next) {
  res.render('setting', { title: 'Setting', user: req.user });
});





module.exports = router;
