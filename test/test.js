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

  it('ログイン時はtwitter iconが表示される', (done) => {
    request(app)
      .get('/')
      .expect(/twitter-icon/)
      .expect(200, done);
  });

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

  it('新規追加できる', (done) => {
    
    const dateInt = 20210530;
    const filter = { userId: userId, dateInt: dateInt };

    User.upsert({ userId: userId, username: username }).then(() => {
      request(app)
        .post('/big6/pushup')
        .send({
          userId: userId,
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


function deleteTestRecord(userId, done, err) {
  Pushup.destroy({ where: { userId: userId } })
  .then(() => {
    if (err) return done(err);
    console.log('pushupsからテスト用のレコードを削除しました')
    done();
  });
}