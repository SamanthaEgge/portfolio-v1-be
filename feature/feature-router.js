const express = require('express')

const router = express.Router()
const Feats = require('./feature-model.js')
const restricted = require('../middleware/restricted.js')

//Public routes
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

router.get('/featured', async (request, response) => {
  try {
    const featured = await Feats.findMainFeats()

    if (featured) {
      response.status(200).json({ featured, message: 'Home page features were found' })
    } else {
      response
        .status(404)
        .json({ message: 'Home page features were not found in the database' })
    }
  } catch (error) {
    console.log(error)
    response.status(500).json({ error, message: 'Unable to make request to server' })
  }
})

// Restricted Routes
router.put('/arrange', restricted, async (request, response) => {
  const settingFeatures = request.body

  if (request.body && request.body.length === 4) {
    try {
      const selectedFeatures = await Feats.selectMainFeats(settingFeatures)
      
      response.status(200).json({ selectedFeatures, message: 'Selected Features are updated' })

    } catch (error) {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to make request to server' })
    }
  } else {
    response.status(400).json({ message: 'Please include 4 features to select as primary features' })
  }
})

router.post('/', restricted, async (request, response) => {
  const newFeat = request.body

  if ( newFeat.feature_title && newFeat.feature_photo && feature_summary ) {
    Feats.createFeat(newFeat)
    .then(feat => {
      response.status(202).json({ feat, message: 'New feature created' })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Could not reach server to add feature.' })
    })
  } else {
    response.status(400).json({ message: 'Adding new feat requires title, photo, and summary.' })
  }

})

router.put('/:featID', restricted, async (request, response) => {
  const featID = request.params.featID
  const featUpdate = request.body

  if (featUpdate) {
    try {
      const updatedFeat = await Feats.modifyFeat(featID, featUpdate)

      if (updatedFeat) {
        response.status(200).json({ updatedFeat, message: `Feature ${featID} has been updated`})
      } else {
        response.status(400).json({ message: `Feature ${featID} has not been updated` })
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to make request to server' })
    }
  } else {
    response.status(400).json({ message: 'Please include an update for a feature' })
  }
})

router.delete('/:featID', restricted, async (request, response) => {
  const featID = request.params.featID

  Feats.deleteFeat(featID)
    .then(feat => {
      response.status(200).json({ feat, message: `Successfully deleted skill ${featID}` })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error, message: 'Unable to make request to server' })
    })

})

module.exports = router