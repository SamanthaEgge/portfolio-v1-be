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
    .where({ cat_id: catId })
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

function modifyCat(catId, updateCat) {
  return db('categories')
    .where({ cat_id: catId })
    .update(updateCat)
    .then(() => {
      return findCatById(catId)
    })
}

function deleteCat(catId) {
  return db('categories')
    .where({ cat_id: catId })
    .del()
    .then(() => {
      return catId
    })
}