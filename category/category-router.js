const express = require('express')

const router = express.Router()
const Categories = require('./category-model.js')
const restricted = require('../middleware/restricted.js')

//// Public routes
router.get('/', (request, response) => {
  Categories.find()
    .then(cats => {
      response.json(cats)
    })
    .catch(error => {
      console.log(error)
      response.status(500).response.json({ message: 'unable to retrieve cats' })
    })
})

router.get('/:id')


//// Restricted Routes