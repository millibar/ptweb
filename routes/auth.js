const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');

const User = require('../models/user');

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
  const filter = { 
    userId: req.user.id
  };
  User.count({ where: filter }).then(dataCount => {
    if (dataCount > 0) {
      console.log(`${req.user.username}でサインインしています`);
      res.json({ status: 'OK' });
    } else {
      res.json({ status: 'NG', message: 'Userテーブルにデータが見つかりませんでした' });
    }
  }).catch(error => {
    console.error(error);
    res.json({ status: 'NG', message: 'サーバーのDBのレコード数取得時ににエラーが発生しました' });
  });
});

/* オンライン状態確認用Web API */
router.post('/isOnLine', (req, res, next) => {
  console.log('オンラインです');
  res.json({ status: 'OK' });
});


module.exports = router;
