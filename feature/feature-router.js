const express = require('express')

const router = express.Router()
const Feats = require('./feature-model.js')
const restricted = require('../middleware/restricted.js')

router.get('/', async (request, response) => {
  try {
    const feats = await Feats.findAllFeats();

    if (feats) {
      response.status(200).json({ feats, message: 'All feats were found' });
    } else {
      response
        .status(404)
        .json({ message: 'Feats were not found in the database' });
    }
  } catch (error) {
    console.log(error)
    response.status(500).json({ error, message: 'Unable to make request to server' });
  }
})

router.get('/feats', async (request, response) => {
  
})

module.exports = router