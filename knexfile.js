require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  
  /// Development if you host locally
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'portfoliov1', // What the DB should be named locally
      user:     "postgres", // This should be the default unless you have changed it
      password: process.env.POSTGRES_PASS // The password you set for POSTGRES not PgAdmin
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  //// Standard development/production set up if you're using Heroku only
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  }
};
