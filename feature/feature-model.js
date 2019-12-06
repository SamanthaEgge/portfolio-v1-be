const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllFeats,
  findFeatById,
  findMainFeats,
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
    .then(feat => {
      feat
        .leftJoin('blog')
        .where({ blog_id: feat.blog_id })
        .select('*')
        .leftJoin('skill')
    })
}

// function findProjectByID(id) {
//    return db('projects')
//      .where({id})
//      .first()
//      .then(project => {
//        return db('project_team')
//          .where({ project_id: id})
//          .join('vendors as v', 'l.item_vendor', 'v.id')
//          .select('l.id', 'l.event_id', 'l.item_name', 'l.item_cost', 'l.item_complete', 'v.vendor_name')
//          .then(items => {
//            return {...event, items: items}
//          })
//      })
//  }

async function findMainFeats() {
  let mainFeats;
  return db('feats')
    .where({feature_active: true})
    .select('*')
    .sort('feature_position')
    .then(feats => {
      await feats.forEach(feat => {
        let addedFeat = findFeatById(feat.feat_id)
        mainFeats.push(addedFeat)
      })
      return mainFeats
    })
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