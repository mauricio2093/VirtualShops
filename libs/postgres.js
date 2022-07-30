/* eslint-disable class-methods-use-this */
const { Client } = require('pg');

class ConnectionPgsql {
  getConnection = async () => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'mauro',
      password: 'admin123',
      database: 'my_store',
    });
    await client.connect();
    return client;
  };
}
module.exports = ConnectionPgsql;
