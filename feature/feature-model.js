const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllFeats,
  findFeatById,
  findMainFeats,
  selectMainFeats,
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

async function selectMainFeats(featArray) {
  let updatedFeatures;
  try {
    let feats = await findAllFeats()
    console.log(feats)
    feats.forEach(feat => {
      db('feats')
        .where({ feat_id: feat.feat_id })
        .update({ feature_postition: null })
    })

    await featArray.forEach(feat => {
      db('feats')
        .where({ feat_id: feat.feat_Id })
        .update(feat.feature_position)
        .then(feat => {
          updatedFeatures.push(feat)
        })
    })
    return updatedFeatures
    
  } catch {
    return console.log('error with clearing feat fields')
  }
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