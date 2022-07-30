const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

module.exports = sequelize;
