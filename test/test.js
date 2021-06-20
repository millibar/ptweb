'use strict';
const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');
const assert = require('assert');
const User = require('../models/user');
const Pushup = require('../models/big6').Pushup;
const { resolve } = require('path');

describe('/', () => {
  before(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });
  });

  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  it('トップページが表示される', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });

  /*
  it('ログイン時はtwitter iconが表示される', (done) => {
    request(app)
      .get('/')
      .expect(/twitter-icon/)
      .expect(200, done);
  });
  */

});

describe('/logout', () => {
  it('ログアウトすると/settingにリダイレクトされる', (done) => {
    request(app)
      .get('/logout')
      .expect('Location', '/setting')
      .expect(302, done);
  });
});

describe('/big6/pushup', () => {
  const userId = 0;
  const username = 'testuser';
  
  before(() => {
    passportStub.install(app);
    passportStub.login({ id: userId, username: username });
  });

  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  it('PUSHUPページが表示される', (done) => {
    request(app)
      .get('/big6/pushup')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/PUSHUP/)
      .expect(200, done);
  });

  it('新規追加できる', (done) => {
    
    const dateInt = 20210530;
    const filter = { userId: userId, dateInt: dateInt };

    User.upsert({ userId: userId, username: username }).then(() => {
      request(app)
        .post('/big6/pushup')
        .send({
          dateInt: dateInt,
          step: 3,
          set1: 30,
          set2: 29,
          set3: 28,
          set1Alt: '',
          set2Alt: '',
          set3Alt: '',
          updatedAt: Date.now()
        })
        .end((err, res) => {
          Pushup.findOne({ where: filter })
          .then(record => {
            assert.strictEqual(record.dateInt, dateInt);
            assert.strictEqual(record.step, 3);
            assert.strictEqual(record.set1, 30);
            assert.strictEqual(record.set2, 29);
            assert.strictEqual(record.set3, 28);
            
            deleteTestRecord(userId, done, err);
            
          });
        });
    });
  });

});


describe('twitterIdToDbName', () => {
  const u = require('../myUtil');
  it('user.idを変換して10桁の文字列にする', () => {
    assert.strictEqual(u.twitterIdToDbName('1345236880523108352'), 'BiAkkFXKfA');
  });


});


describe('/setting', () => {
  const userId = 0;
  const username = 'testuser';
  const data1 = {
    dateInt: 20210601,
    step: 1,
    set1: 10,
    set2: 9,
    set3: 8,
    set1Alt: '',
    set2Alt: '',
    set3Alt: '',
    updatedAt: 202106011234
  }
  const data2 = {
    dateInt: 20210602,
    step: 2,
    set1: 20,
    set2: 19,
    set3: 18,
    set1Alt: '',
    set2Alt: '',
    set3Alt: '',
    updatedAt: 202106021234
  }
  const data3 = {
    dateInt: 20210603,
    step: 3,
    set1: 30,
    set2: 29,
    set3: 28,
    set1Alt: '',
    set2Alt: '',
    set3Alt: '',
    updatedAt: 202106031234
  }
  // data4は欠番
  const data5a = {
    dateInt: 20210605,
    step: 5,
    set1: 50,
    set2: 49,
    set3: 48,
    set1Alt: '',
    set2Alt: '',
    set3Alt: '',
    updatedAt: 202106051234
  }
  const data5b = {
    dateInt: 20210605,
    step: 6,
    set1: 60,
    set2: 59,
    set3: 58,
    set1Alt: '',
    set2Alt: '',
    set3Alt: '',
    updatedAt: 202106051235
  }
  const data6a = {
    dateInt: 20210606,
    step: 7,
    set1: 10,
    set2: 9,
    set3: 8,
    set1Alt: 6,
    set2Alt: 5,
    set3Alt: 4,
    updatedAt: 202106061234
  }
  const data6b = {
    dateInt: 20210606,
    step: 8,
    set1: 11,
    set2: 12,
    set3: 13,
    set1Alt: 14,
    set2Alt: 15,
    set3Alt: 16,
    updatedAt: 202106061235
  }
  const bulkDataPOST = { 20210601: data1, 20210602: data2, 20210603: null, 20210604: null, 20210605: data5b, 20210606: data6a };
  const bulkDataDB   = { 20210601: data1, 20210602: null, 20210603: data3, 20210604: null, 20210605: data5a, 20210606: data6b };
  
  before(() => {
    passportStub.install(app);
    passportStub.login({ id: userId, username: username });
  });

  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  it('settingが開く', (done) => {
    request(app)
      .get('/setting')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/Setting/)
      .expect(200, done);
  });

  it('同期のテストのための準備', (done) => {
    request(app).post('/big6/pushup/sync')
      .send(bulkDataDB)
      .end((err, res) => {
        const response = res.body.data;
        assert.strictEqual(response.length, 0);
        done();
      });
  });

  it('同期できる', (done) => {
    request(app).post('/big6/pushup/sync')
    .send(bulkDataPOST)
    .end((err, res) => {
      const response = res.body.data;
      assert.strictEqual(response.length, 2);
      assert.strictEqual(response[0].dateInt, data3.dateInt);
      assert.strictEqual(response[1].dateInt, data6b.dateInt);
      assert.strictEqual(response[1].step, data6b.step);

      Pushup.findOne({ where: { userId: userId, dateInt: 20210602 }} ).then(record => {
        assert.strictEqual(record.step, data2.step);
        assert.strictEqual(record.set1, data2.set1);
        assert.strictEqual(record.set2, data2.set2);
        assert.strictEqual(record.set3, data2.set3);

        deleteTestRecord(userId, done, err);
      });
   });
 });

});



function deleteTestRecord(userId, done, err) {
  Pushup.destroy({ where: { userId: userId } })
  .then(() => {
    if (err) return done(err);
    console.log('--- pushupsからテスト用のレコードを削除しました ---')
    done();
  });
}