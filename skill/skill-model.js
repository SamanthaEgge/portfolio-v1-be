const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllSkills,
  findSkillById,
  createSkill,
  modifySkill,
  deleteSkill
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