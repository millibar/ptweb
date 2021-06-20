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
  
  Table.findAll({ where: filter }).then(records => {
    let hasError = false; // どこかでエラーが起こったフラグ
    let errorMessage = '';

    // 返却用のレコードを格納する
    const outputBulkData = [];

    // 更新用のPromiseを格納する
    const updatingPromises = [];

    if (records.length) {
      for (const record of records) {
        // DB内にあるレコードと同じdateIntのdataをbulkDataから取り出す
        const posted = bulkData[record.dateInt]; // nullの可能性がある
        delete bulkData[record.dateInt];

        const postedDate = posted ? Number.parseInt(posted.updatedAt) : 0;
        const recordDate = Number.parseInt(record.updatedAt);// bigIntのままだと比較できないみたいなので変換する
        
        if (!posted || (postedDate < recordDate)) {
          console.log('サーバーのDBにしかレコードがない、またはDBのレコードのほうが更新日時が新しい\n', record);
          // 返却用のレコードリストへ追加する
          const data = {
            dateInt: record.dateInt,
            step: record.step,
            set1: record.set1,
            set1Alt: record.set1Alt,
            set2: record.set2,
            set2Alt: record.set2Alt,
            set3: record.set3,
            set3Alt: record.set3Alt,
            updatedAt: record.updatedAt,
            deletedAt: record.deletedAt
          }
          outputBulkData.push(data);

        } else if (postedDate === recordDate) {
          console.log(`サーバーのDBのレコードとPOSTされたレコードは更新日時が同じ：${postedDate}`);
          // 何もしない

        } else {
          console.log(`サーバーのDBのレコードのほうが更新日時が古い：POST ${postedDate}, DB ${recordDate}`);
          // DBのレコードを更新する
          const updatingData = convert(userId, posted);
          const updatingFilter = { userId: userId, dateInt: updatingData.dateInt };

          const updating = new Promise((resolve, reject) => {
            Table.update(updatingData, { where: updatingFilter }).then(() => {
              console.log('レコードを更新しました\n', updatingData);
              resolve();
            }).catch(error => {
              hasError = true;
              errorMessage += `サーバーのDBのレコード更新時にエラーが発生しました：${updatingData.dateInt}\n`;
              console.error(error)
              reject()
            });
          });
          updatingPromises.push(updating);
        }
      }
    }
    // この時点で、bulkDataにはDB内のレコードと同じdateIntのdataはなくなっている
    // ただし、{ 20210619: null } のような、valueがnull値のデータが含まれている可能性がある

    Promise.all(updatingPromises).then(() => {

      // DBにはないレコードを新規レコードとして書き込む
      const creatingBulkData = [];
      
      for (const dateInt of Object.keys(bulkData)) {
        const posted = bulkData[dateInt];
        if (posted) {
          const creatingData = convert(userId, posted);
          creatingBulkData.push(creatingData);
        }
      }
      
      if (creatingBulkData.length) {
        Table.bulkCreate(creatingBulkData).then(() => {
          console.log(`レコードを新規作成しました:${creatingBulkData.length}件\n`, creatingBulkData);
        }).catch(error => {
          console.error(error);
          hasError = true;
          errorMessage += 'サーバーのDBへの新規レコード追加時にエラーが発生しました'
        });
      }

      if (hasError) {
        res.json({ status: 'NG', message: errorMessage });
      } else {
        // DBにしかない、またはDBのほうが新しいレコードを返却する
        console.log(`サーバーのDBにしかレコードがない、またはDBのレコードのほうが更新日時が新しいレコードを返す：${outputBulkData.length}件\n`, outputBulkData);
        res.json({ status: 'OK', data: outputBulkData });
      }
    });

  }).catch(error => {
    console.error(error);
    res.json({ status: 'NG', message: 'サーバーのDBのレコード読み込み時ににエラーが発生しました' });
  });
}

module.exports = router;