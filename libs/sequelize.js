const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

// sequelize.sync();  creación de tablas - no se aconseja en temas de migración

module.exports = sequelize;
