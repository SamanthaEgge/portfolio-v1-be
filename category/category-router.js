const express = require('express')

const router = express.Router()
const Categories = require('./category-model.js')
// const restricted = require('../middleware/restricted.js')

//// Public routes
router.get('/', (request, response) => {
  Categories.findAllCats()
    .then(cats => {
      response.status(200).json(cats)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'unable to retrieve cats' })
    })
})

router.get('/:catId', (request, response) => {
  const catId = request.params.catId

  Categories.findCatById(catId)
    .then(cat => {
      response.status(200).json(cat)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to retrieve this categeory.' })
    })
})

//// Restricted Routes
// router.post('/', restricted, (request, response) => {
router.post('/', (request, response) => {
  const newCat = request.body

  Categories.createCat(newCat)
    .then(cat => {
      response.status(204).json({ cat, message: 'Created a new Category' })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to create a category' })
    })
})

// router.put('/:catId', restricted, (request, response) => {
router.put('/:catId', (request, response) => {
  const catId = request.params.catId
  const catChanges = request.body

  Categories.modifyCat(catId, catChanges)
    .then(cat => {
      response.status(200).json({ cat, message: `Successfully modified Category ${catId}` })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Could not modify category on server.' })
    })
})

// router.delete('/:catId', restricted, (request, response) => {
router.delete('/:catId', (request, response) => {
  const catId = request.params.catId

  Categories.deleteCat(catId)
    .then(removed => {
      response.status(200).json({ removed, message: `Sucessfully deleted Category ${catId}` })
    })
})

module.exports = router