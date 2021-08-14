'use strict';

const Sequelize = require('sequelize');

// ローカルでSSL接続エラーになるのでheroku用のオプションを分離
const dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
}

const sequelize = process.env.DATABASE_URL ?
  // 本番環境
  new Sequelize(
    process.env.DATABASE_URL,
    {
      logging: false,
      dialectOptions
    }
  )
  :
  // 開発環境
  new Sequelize(
    'postgres://postgres:postgres@db/prisoner_training',
    {
      logging: false
    }
  );

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};
