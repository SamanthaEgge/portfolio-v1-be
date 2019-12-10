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

router.get('/:skillId', async (request, response) => {
  const skillId = request.params.skillId

  try {
    const skill = await Skills.findSkillById();

    if (skill) {
      response.status(200).json({ skill, message: 'The skill was found' });
    } else {
      response
        .status(404)
        .json({ message: 'The skill was not found in the database' });
    }
  } catch (error) {
    console.log(error)
    response.status(500).json({ error, message: 'Unable to make request to server' });
  }
})

//// Restricted Routes
router.post('/', restricted, (request, response) => {
  const newSkill = request.body
  if (newSkill) {
    Skills.createSkill(newSkill)
    .then(skill => {
      response.status(204).json({ skill, message: 'Created a new Skill' })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to create a skill' })
    })
  } else {
    response.status(400).json({ message: 'Please submit a skill to be created' })
  }

})

router.put('/:skillId', restricted, (request, response) => {
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

router.delete('/:skillId', restricted, (request, response) => {
  const skillId = request.params.skillId

  Skills.deleteSkill(skillId)
    .then(removed => {
      response.status(200).json({ removed, message: `Sucessfully deleted Skill ${skillId}` })
    })
})