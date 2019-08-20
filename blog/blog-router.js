//// These routes are set up for the front facing section of the blog

const express = require('express')

const router = express.Router()
const db = require('./blog-model')

//// GET for main page of blog, retrieves a set number of posts

router.get('/blog', (request, response) => {
  db.get()
    .then(posts => {
      response.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error retreiving list of posts from server' })
    })
})

router.get('/blog/?')

router.get('/blog/:title', (request, response) => {

})

//// middleware for blogRouter



module.exports = router