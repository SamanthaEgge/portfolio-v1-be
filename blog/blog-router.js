//// All blog routing

const express = require('express')

const router = express.Router()
const Blog = require('./blog-model')

const restricted = require('../middleware/restricted.js/index.js')


/////// Non-restricted routes, for front-facing portfolio
/// GET for main page of blog, retrieves a set number of posts

router.get('/blog', (request, response) => {
  Blog.find()
    .then(posts => {
      response.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error retreiving list of posts from server' })
    })
})

router.get('/blog/?', (request, response) => {
  Blog.get()
})

router.get('/blog/:title', (request, response) => {
  const title = request.params.title


})


/////// Restricted routes, for admin panel



//// middleware for blogRouter



module.exports = router