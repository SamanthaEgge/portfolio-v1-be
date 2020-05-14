//// All blog routing

const express = require('express')

const router = express.Router()
const Blog = require('./blog-model')

// const restricted = require('../middleware/restricted.js')

/////// Non-restricted routes, for front-facing portfolio
/// GET for main page of blog, retrieves a set number of posts

router.get('/', (request, response) => {
  Blog.findAllBlogs()
    .then(posts => {
      response.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error retreiving list of posts from server' })
    })
})

// router.get('/blog/?', (request, response) => {
//   Blog.get()
// })

router.get('/:slug', (request, response) => {
  const slug = request.params.slug
  
  Blog.findBlogBySlug(slug)
    .then(post => {
      response.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error retriving Blog'})
    })

})

router.post('/', (request, response) => {
  const newBlog = request.body

  Blog.createBlog(newBlog)
    .then(post => {
      response.status(200).json(post)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error creating Blog' })
    })

})


/////// Restricted routes, for admin panel

module.exports = router