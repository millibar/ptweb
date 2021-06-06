'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/prisoner_training',
  {
    operatorsAlizses: false
  }
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};
