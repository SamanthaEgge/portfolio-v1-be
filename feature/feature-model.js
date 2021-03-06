const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)
const Skills = require('../skill/skill-model.js')

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
  let skill_array = []

  let all_skills = await db('skillPair')
    .where('skillPair.feat_id', featId)
    .join('skills', 'skills.skill_id', 'skillPair.skill_id')
    .select('skills.skill_name')

  // console.log(all_skills)

  all_skills.forEach(skill => {
    skill_array.push(skill.skill_name)
  })

  // console.log(skill_array)
  
  let single_feat = await db('features')
    // .where({ feat_id: featId })
    // .first()
    .join('blog', 'blog.blog_id', 'features.blog_id')
    // .join('skillPair', 'skillPair.feat_id', 'features.feat_id')
    // .join('skills', 'skills.skill_id', 'skillPair.skill_id')
    .where('features.feat_id', featId)
    .select('features.*', 'blog.blog_slug')

  single_feat[0].skills = skill_array

  console.log(single_feat)

  return single_feat
}






function findingFeats(feat) {
  return new Promise ((resolve) => {
    setTimeout(() => {
      let addedFeat = findFeatById(feat.feat_id)
      resolve(addedFeat);
    }, 400);
  })
}
  
async function pushToMain(feats) {
  let asyncMain = []
  for (const feat of feats) {
    const addedFeat = await findingFeats(feat);
    asyncMain.push(addedFeat);
  }
  console.log(asyncMain);
  return asyncMain
}

// Primary functionality for the main page, any clicks will go to blog post with further deets. Only front facing model
async function findMainFeats() {
  let mainFeatsFunction = [];
  await db('features')
    .where('features.feature_active', true)
    .select('*')
    .then(feats => {
      mainFeatsFunction = pushToMain(feats)
    })
    // .sort('feature_position')
    // .then(feats => {
    //   feats.forEach(async feat => {
    //     let addedFeat = await findFeatById(feat.feat_id)
    //     console.log('heres the addedFeat in findMain', addedFeat)
    //     mainFeats.push(addedFeat)
    //     console.log('each iteration of mainFeats')
    //     })
    //   })    
    // console.log('MAINFEATS IN MODEL', mainFeatsFunction)
    return mainFeatsFunction
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
async function createFeat(newFeat) {
  let feat_skills = newFeat.skills
  delete newFeat.skills

  let new_feat = await db('features')
    .insert(newFeat)
    .returning('*')

  console.log(new_feat)

  await Skills.addSkillPair(new_feat.feat_id, feat_skills)

  return findFeatById(new_feat.feat_id) 
}

function modifyFeat(featId, updateFeat) {
  let feat_skills = updateFeat.skills
  delete updateFeat.skills

  return db('features')
    .where({ feat_id: featId })
    .update(updateFeat)
    .then(() => {
      // Skills.removeSkillPair(featId)
      // Skills.addSkillPair(featId, feat_skills)
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