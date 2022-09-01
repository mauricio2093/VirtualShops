/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';

const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
