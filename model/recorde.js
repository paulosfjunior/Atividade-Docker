const Sequelize = require('sequelize');
const database = require('../utils/db');

const Recorde = database.define('recorde', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  },
  tempo: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

module.exports = Recorde;