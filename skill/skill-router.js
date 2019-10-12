const express = require('express')

const router = express.Router()
const Skills = require('./skill-model.js')
const restricted = require('../middleware/restricted.js')

//// Public routes
router.get('/', (request, response) => {
  Skills.findAllSkills()
    .then(skills => {
      response.status(200).json(skills)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Unable to retrieve skills' })
    })
})

router.get('/:skillId', (request, response) => {
  const skillId = request.params.skillId

  Skills.findSkillById(skillId)
    .then(skill => {
      response.status(200).json(skill)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to retrieve this skill.' })
    })
})

//// Restricted Routes
router.post('/', (request, response) => {
  const newSkill = request.body

  Skills.createSkill(newSkill)
    .then(skill => {
      response.status(204).json({ skill, message: 'Created a new Skill' })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to create a skill' })
    })
})

router.put('/:skillId', (request, response) => {
  const skillId = request.params.skillId
  const skillChanges = request.body

  Skills.modifySkill(skillId, skillChanges)
    .then(skill => {
      response.status(200).json({ skill, message: `Successfully modified skill ${skillId}` })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Could not modify skill on server.' })
    })
})

router.delete('/:skillId', (request, response) => {
  const skillId = request.params.skillId

  Skills.deleteSkill(skillId)
    .then(removed => {
      response.status(200).json({ removed, message: `Sucessfully deleted Skill ${skillId}` })
    })
})