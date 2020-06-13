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

// This is retreiving a list for the admin page.
// Will need to get skill pair in here later, if I implement "view all projects"
function findAllFeats() {
  return db('features')
    .select('*')
}

// Used by Admin for editing feats
async function findFeatById(featId) {
  let single_feat = await db('features')
    // .where({ feat_id: featId })
    // .first()
    .join('blog', 'blog.blog_id', 'features.blog_id')
    .join('skillPair', 'skillPair.feat_id', 'features.feat_id')
    .join('skills', 'skills.skill_id', 'skillPair.skill_id')
    .where('features.feat_id', featId)
    .select('features.*', 'blog.blog_slug', 'skills.skill_name')

  return single_feat
}

// Primary functionality for the main page, any clicks will go to blog post with further deets. Only front facing model
async function findMainFeats() {
  let mainFeats;
  await db('features')
    .where({feature_active: true})
    .select('*')
    .sort('feature_position')
    .then(feats => {
      feats.forEach(feat => {
        let addedFeat = findFeatById(feat.feat_id)
        mainFeats.push(addedFeat)
      })
      return mainFeats
    })
}

// Admin functionality to reset Feat
function selectMainFeats(featArray) {
  let updatedFeatures;
  try {
    let feats = findAllFeats()
    console.log(feats)
    feats.forEach(feat => {
      db('features')
        .where({ feat_id: feat.feat_id })
        .update({ feature_postition: null })
    })

    featArray.forEach(feat => {
      db('features')
        .where({ feat_id: feat.feat_id })
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

// Admin to createFeat. Need to create skillpair joints after creation of feat.
// When creating a new feat, take id of new created feat then need to use this id to send a set of object to skill pair table. Skill pairs will be sent as [{skill: value,feat: 0}]

// foreach.feat.skills(skill => (
    // ...skill,
    // feat: feat_id
// ))
function createFeat(newFeat) {
  let feat_skills = newFeat.skills
  delete newFeat.skills

 
  let new_feat = db('features')
    .insert(newFeat)

  addSkills(new_feat.feat_id, feat_skills)
  return findFeatById(new_feat.feat_id) 
}

function modifyFeat(featId, updateFeat) {
  let feat_skills = updateFeat.skills
  delete updateFeat.skills

  return db('features')
    .where({ feat_id: featId })
    .update(updateFeat)
    .then(() => {
      removeSkills(featId)
      addSkills(featId, feat_skills)
      return findFeatById(featId)
    })
}

// Cascade skill pair table deletion
function deleteFeat(featId) {
  return db('features')
    .where({ feat_id: featId })
    .del()
    .then(() => {
      return featId
    })
}


// Helpler Functions
function addSkills(id, newSkills) {
  newSkills.forEach(skill => {
    let added_skill = {
    feat_id: id,
    skill_id: skill
    }
    return db('skillPair')
      .insert(added_skill)
  })
}

function removeSkills(featId) {
  return db('skillPair')
    .select('*')
    .where('feat_id', featId)
    .del()
}