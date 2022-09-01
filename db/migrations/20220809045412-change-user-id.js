/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
const { DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      field: 'user_id',
      allowNull: 'false',
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
