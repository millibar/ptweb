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

const Op = require('../models/big6').Op;

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

/**
 * 対象のテーブルのレコード数を返す。削除済みフラグのあるレコードは含めない。
 * @param {Model} Table レコード数を調べるテーブル
 * @param {Object} filter where句に指定するフィルター条件
 * @param {*} res レスポンス
 */
function count(Table, filter, res) {
  Table.count({ where: filter }).then(dataCount => {
    console.log(`${dataCount}件`);
    res.json({ status: 'OK', data: dataCount });
  }).catch(error => {
    console.error(error);
    res.json({ status: 'NG', message: 'サーバーのDBのレコード数取得時ににエラーが発生しました' });
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


for (const key of Object.keys(tables)) {
  /* トレーニング内容投稿用Web API */
  router.post(`/${key}`, authenticationEnsurer, (req, res, next) => {
    console.log(`${key}にPOSTされました\n`, req.body);
    const data = convert(req.user.id, req.body);
    const filter = { userId: req.user.id, dateInt: req.body.dateInt };
    
    put(tables[key], data, filter, res);
  });

  /* トレーニングのレコード数取得用Web API */
  router.post(`/${key}/count`, authenticationEnsurer, (req, res, next) => {
    console.log(`${req.user.username}より${key}のレコード数を要求されました`);

    const filter = { 
      userId: req.user.id,
      deletedAt: null
    };

    count(tables[key], filter, res);
  });

  /* トレーニング同期用Web API */
  router.post(`/${key}/sync`, authenticationEnsurer, (req, res, next) => {
    console.log(`${key}に同期のためにPOSTされました：${Object.keys(req.body).length}件\n`, req.body);

    const bulkData = req.body;
    const dateIntList = Object.keys(bulkData);
    const start = dateIntList[0];
    const end = dateIntList[dateIntList.length - 1];
    
    const filter = { 
      userId: req.user.id,
      dateInt: { [Op.between]: [start, end] }
    };
    
    sync(tables[key], bulkData, filter, res);
  });
}


/**
 * POSTされたdataのうち、dateIntの値がDBのレコードと同じものをupdatedAtで比較し、
 * DBのほうが古ければDBのレコードを更新する
 * DBのほうが新しい、もしくはDBにしかレコードがなければDBのレコードをJSONで返す
 * DBにレコードがなければ、DBに新規レコードを追加する
 * @param {Table} Table 更新するテーブル
 * @param {Object} bulkData { dateInt: data } 形式の辞書
 * @param {Object} filter where句に与えるフィルター条件 { userId: req.user.id, dateInt: { 範囲 } }
 * @param {*} res 
 */
function sync(Table, bulkData, filter, res) {
  const userId = filter.userId;

  const responseBulkData = []; // 返却するレコードを格納する
  const updatingBulkData = []; // 更新予定のレコードを格納する
  const creatingBulkData = []; // 新規追加するレコードを格納する

  Table.findAll({ where: filter }).then(records => {// POSTされた範囲のレコードをDBから取得する
    return new Promise(resolve => {
      if (records.length) { // DB内の各レコードについて、POSTされたdataとupdatedAtを比較する
        for (const record of records) {
          // このrecordと同じdateIntをもつdataをbulkDataから取り出す
          const posted = bulkData[record.dateInt]; // nullの可能性がある
          delete bulkData[record.dateInt];

          const postedDateTime = posted ? Number.parseInt(posted.updatedAt) : 0;
          const recordDateTime = Number.parseInt(record.updatedAt); // bigIntのままだと比較できないみたいなので変換する

          if (!posted || postedDateTime < recordDateTime) {
            console.log(`サーバーのDBにしかレコードがない、またはDBのレコードのほうが更新日時が新しい：${record.dateInt}\n`, record);
            // 返却用のレコードリストへ追加する
            const responseData = {
              dateInt: record.dateInt,
              step: record.step,
              set1: record.set1,
              set2: record.set2,
              set3: record.set3,
              set1Alt: record.set1Alt,
              set2Alt: record.set2Alt,
              set3Alt: record.set3Alt,
              updatedAt: record.updatedAt,
              deletedAt: record.deletedAt
            }
            responseBulkData.push(responseData)
          } else if (posted && postedDateTime > recordDateTime) {
            console.log(`サーバーのDBのレコードのほうが更新日時が古い：${record.dateInt} updatedAt POST ${postedDateTime}, DB ${recordDateTime}`);
            // 更新用のレコードリストへ追加する
            const updatingData = convert(userId, posted);
            updatingBulkData.push(updatingData);

          } else {
            console.log(`サーバーのDBのレコードとPOSTされたレコードは更新日時が同じ：${record.dateInt} updatedAt ${postedDateTime}`);
            // 何もしない
          }
        }
        resolve();
      } else {
        console.log('POSTされたデータはすべて新規レコード');
        resolve();
      }
    });
  }).then(() => {// DBのレコードを更新する
    const updatingPromises = [];
    for (const updatingData of updatingBulkData) {
      const updatingFilter = { userId: userId, dateInt: updatingData.dateInt };
      const updating = new Promise((resolve, reject) => {
        Table.update(updatingData, { where: updatingFilter }).then(() => {
          console.log('レコードを更新しました\n', updatingData);
          resolve();
        }).catch(error => {
          console.error('レコードの更新時にエラーが発生しました\n', error);
          reject();
        });
      });
      updatingPromises.push(updating);
    }
    return Promise.all(updatingPromises);
  }).then(() => { // DBに新規レコードを追加する
    // この時点で、bulkDataにはDB内のレコードと同じdateIntのdataはなくなっている
    // ただし、{ 20210619: null } のような、valueがnullのデータが含まれている可能性がある
    for (const dateInt of Object.keys(bulkData)) {
      const posted = bulkData[dateInt];
      if (posted) {
        const creatingData = convert(userId, posted);
        creatingBulkData.push(creatingData);
      }
    }
    return new Promise((resolve, reject) => {
      if (creatingBulkData.length) {
        Table.bulkCreate(creatingBulkData).then(() => {
          console.log(`レコードを新規作成しました：${creatingBulkData.length}件\n`, creatingBulkData);
          resolve();
        }).catch(error => {
          console.error('レコードの新規作成時にエラーが発生しました', error);
          reject();
        });
      } else {
        resolve();
      }
    });
  }).then(() => { // DBのレコードをJSONで返す
    console.log(`同期用のレコードを返却します：${responseBulkData.length}件\n`, responseBulkData);
    res.json({ status: 'OK', data: responseBulkData });

  }).catch(error => {
    console.error(error);
    res.json({ status: 'NG', message: 'サーバーのDBの同期処理中にエラーが発生しました' });
  });
}

module.exports = router;