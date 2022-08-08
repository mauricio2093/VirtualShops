const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
