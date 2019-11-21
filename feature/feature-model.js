const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllFeats,
  findFeatById,
  createFeat,
  modifyFeat,
  deleteFeat
}

function findAllFeats() {
  return db('feats')
    .select('*')
}

function findFeatById(featId) {
  return db('feats')
    .where({ feat_id: featId })
    .first()
    .select('*')
}

function createFeat(newFeat) {
  return db('feats')
    .insert(newFeat, 'feat_id')
    .then(ids => {
      const [id] = ids;
      return findFeatById(id) 
    })
}

function modifyFeat(featId, updateFeat) {
  return db('feats')
    .where({ feat_id: featId })
    .update(updateFeat)
    .then(() => {
      return findFeatById(featId)
    })
}

function deleteFeat(featId) {
  return db('feats')
    .where({ feat_id: featId })
    .del()
    .then(() => {
      return featId
    })
}