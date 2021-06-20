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

// Objectは参照渡しなので、複数のテーブルで使いまわすとindexesが重複してしまう
const options1 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const options2 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const options3 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const options4 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const options5 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};

const options6 = {
  freezeTableName: true,
  timestamps: false,
  indexes: [
    {
      fields: ['userId', 'dateInt']
    }
  ]
};



const Pushup    = loader.database.define('pushup',    fields, options1);
const Squat     = loader.database.define('squat',     fields, options2);
const Pullup    = loader.database.define('pullup',    fields, options3);
const LegRaise  = loader.database.define('leg_raise', fields, options4);
const Bridge    = loader.database.define('bridge',    fields, options5);
const Handstand = loader.database.define('handstand', fields, options6);


module.exports = {
  Pushup,
  Squat,
  Pullup,
  LegRaise,
  Bridge,
  Handstand,
  Op,
};