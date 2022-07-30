/* eslint-disable class-methods-use-this */
const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
