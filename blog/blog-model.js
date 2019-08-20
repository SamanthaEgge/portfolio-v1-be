const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  find,
}

function find() {
  return db('users')
    .select('id', 'email', 'password');
}