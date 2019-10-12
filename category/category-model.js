const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllCats,
  findCatById,
  createCat,
  modifyCat,
  deleteCat
}

function findAllCats() {
  return db('categories')
    .select('*')
}

function findCatById(catId) {
  return db('categories')
    .where(catId)
    .first()
    .select('*')
}

function createCat(newCat) {
  return db('categories')
    .insert(newCat, 'cat_id')
    .then(ids => {
      const [id] = ids;
      return findCatById(id) 
    })
}

function 