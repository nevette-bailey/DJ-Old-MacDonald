const Sequelize = require('sequelize');
const db = require('../db');

const Loop = db.define('loop', {
  // in the future, title will be a value that the user inputs when they click save
  title: {
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
    allowNull: true
  },
  sound7: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: true
  },
  sound8: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN),
    allowNull: true
  }
});

module.exports = Loop;
