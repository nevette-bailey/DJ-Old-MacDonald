const Sequelize = require('sequelize');
const db = require('../db');

const Loop = db.define('loop', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  sound1: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound2: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound3: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound4: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound5: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound6: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound7: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  },
  sound8: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: false
  }
});

module.exports = Loop;
