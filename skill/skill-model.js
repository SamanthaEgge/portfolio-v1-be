const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllSkills,
  findSkillById,
  createSkill,
  modifySkill,
  deleteSkill,
  findSkillPairs,
  addSkillPair,
  deleteSkillPair,
  // removeSkillPair
}

function findAllSkills() {
  return db('skills')
    .select('*')
}

function findSkillById(skillId) {
  return db('skills')
    .where({ skill_id: skillId })
    .first()
    .select('*')
}

function createSkill(newSkill) {
  return db('skills')
    .insert(newSkill, 'skill_id')
    .then(ids => {
      const [id] = ids;
      return findSkillById(id) 
    })
}

function modifySkill(skillId, updateSkill) {
  return db('skills')
    .where({ skill_id: skillId })
    .update(updateSkill)
    .then(() => {
      return findSkillById(skillId)
    })
}

function deleteSkill(skillId) {
  return db('skills')
    .where({ skill_id: skillId })
    .del()
    .then(() => {
      return skillId
    })
}


///// Skill Pair Table
function findSkillPairs() {
  return db('skillPair')
    .select('*')
}

function addSkillPair(feat_id, skills) {
  console.log('were in added skills')
  console.log(skills)
  skill_array = []
  skills.forEach(skill => {
    let added_skill = {
    feat_id: feat_id,
    skill_id: skill
    }
    skill_array.push(added_skill)
  })

  return db('skillPair')
    .insert(skill_array)
    console.log('added a skill', skill)
}

// function removeSkillPair(featId) {
//   return db('skillPair')
//     .select('*')
//     .where('feat_id', featId)
//     .del()
// }

function deleteSkillPair(pair_id) {
  return db('skillPair')
    .where({ skill_pair_id: pair_id })
    .del()
    .then(() => {
      return pair_id
    })
}