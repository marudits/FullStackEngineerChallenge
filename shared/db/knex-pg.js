const knex = require('knex');

const config = {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_DATABASE || 'paypay',
      charset: 'utf8',
      timezone: 'UTC',
    },
    pool: {
      min: parseInt(process.env.DB_MIN_CONNECTIONS) || 10,
      max: parseInt(process.env.DB_MAX_CONNECTIONS) || 50,
    },
    acquireConnectionTimeout: (10 * 1000),
    // debug: true
};

module.exports = knex(config);
  