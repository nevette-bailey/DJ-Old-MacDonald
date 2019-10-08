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
  }
});

module.exports = Loop;
