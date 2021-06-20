'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;
const Op = Sequelize.Op;

const fields = {
  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  dateInt: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  step: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  set1: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  set1Alt: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  set2: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  set2Alt: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  set3: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  set3Alt: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  deletedAt: {
    type: Sequelize.BIGINT,
    allowNull: true
  }
};

const options = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const Pushup = loader.database.define('pushup', Object.assign({}, fields), Object.assign({}, options));
const Squat = loader.database.define('squat', Object.assign({}, fields), Object.assign({}, options));
const Pullup = loader.database.define('pullup', Object.assign({}, fields), Object.assign({}, options));
const LegRaise = loader.database.define('leg_raise', Object.assign({}, fields), Object.assign({}, options));
const Bridge = loader.database.define('bridge', Object.assign({}, fields), Object.assign({}, options));
const Handstand = loader.database.define('handstand', Object.assign({}, fields), Object.assign({}, options));


module.exports = {
  Pushup,
  Squat,
  Pullup,
  LegRaise,
  Bridge,
  Handstand,
  Op,
};