'use strict';

const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Pushup = require('../models/big6').Pushup;
const Squat = require('../models/big6').Squat;
const Pullup = require('../models/big6').Pullup;
const LegRaise = require('../models/big6').LegRaise;
const Bridge = require('../models/big6').Bridge;
const Handstand = require('../models/big6').Handstand;

/* GET pushup listing. */
router.get('/pushup', function(req, res, next) {
  res.render('big6', { title: 'PUSHUP', big6: 'pushup' });
});

/* GET squat listing. */
router.get('/squat', function(req, res, next) {
  res.render('big6', { title: 'SQUAT', big6: 'squat' });
});

/* GET pullup listing. */
router.get('/pullup', function(req, res, next) {
  res.render('big6', { title: 'PULLUP', big6: 'pullup' });
});

/* GET leg_raise listing. */
router.get('/leg_raise', function(req, res, next) {
  res.render('big6', { title: 'LEG RAISE', big6: 'leg_raise' });
});

/* GET bridge listing. */
router.get('/bridge', function(req, res, next) {
  res.render('big6', { title: 'BRIDGE', big6: 'bridge' });
});

/* GET handstand listing. */
router.get('/handstand', function(req, res, next) {
  res.render('big6', { title: 'HANDSTAND PUSHUP', big6: 'handstand' });
});

/**
 * POSTされたdataをDBに書き込める形式に変換して返す
 * @param {number} userId 
 * @param {Object} data 
 * @returns {Object} 
 */
function convert(userId, data) {

  const dateInt = data.dateInt;
  const step = data.step;
  const set1 = data.set1 || null;
  const set2 = data.set2 || null;
  const set3 = data.set3 || null;
  const set1Alt = data.set1Alt || null;
  const set2Alt = data.set2Alt || null;
  const set3Alt = data.set3Alt || null;
  const updatedAt = data.updatedAt;
  const deletedAt = data.deletedAt || null;

  const converted = {
    userId,
    dateInt,
    step,
    set1,
    set1Alt,
    set2,
    set2Alt,
    set3,
    set3Alt,
    updatedAt,
    deletedAt
  }

  return converted;
}

/**
 * 対象のTableにデータを書き込む。同じdateIntのデータは上書きする
 * @param {Model} Table 書き込むテーブル
 * @param {Object} data 書き込むデータ
 * @param {Object} filter where句に指定するフィルター条件
 * @param {*} res レスポンス
 */
function put(Table, data, filter, res) {
  Table.findOrCreate({ where: filter, defaults: data })
  .then(([record, created]) => {
    if (created) {
      console.log('レコードを新規作成しました\n', data);
      res.json({ status: 'OK' });
    } else {
      record.step = data.step;
      record.set1 = data.set1;
      record.set1Alt = data.set1Alt;
      record.set2 = data.set2;
      record.set2Alt = data.set2Alt;
      record.set3 = data.set3;
      record.set3Alt = data.set3Alt;
      record.updatedAt = data.updatedAt;
      record.deletedAt = data.deletedAt;
      record.save();
      console.log('レコードを更新しました\n', data);
      res.json({ status: 'OK' });
    }
  }).catch(error => {
    console.error(error);
    res.json({ status: 'NG', message: 'サーバーのDBのレコード更新時ににエラーが発生しました' });
  });
}

const tables = {
  pushup: Pushup,
  squat: Squat,
  pullup: Pullup,
  leg_raise: LegRaise,
  bridge: Bridge,
  Handstand: Handstand
}

/* トレーニング内容投稿用Web API */
for (const key of Object.keys(tables)) {
  router.post(`/${key}`, authenticationEnsurer, (req, res, next) => {
    console.log(`${key}にPOSTされました\n`, req.body);
    const data = convert(req.user.id, req.body);
    const filter = { userId: req.user.id, dateInt: req.body.dateInt };
    
    put(tables[key], data, filter, res);
  });
}

module.exports = router;