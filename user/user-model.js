const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  find,
  findBy,
  create,
  findById
}

function find() {
  return db('users')
    .select('id', 'email', 'password');
}

function findBy(filter) {
  return db('users')
    .where(filter);
}

function create(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id)
    })
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
    .select('*');
}