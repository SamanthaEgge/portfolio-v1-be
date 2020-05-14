const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllBlogs,
  findBlogBySlug,
  createBlog
}

// TODO: Inverse this so it goes newest to oldest
function findAllBlogs() {
  return db('blog')
    .select('*');
}

function findBlogBySlug(slug) {
  return db('blog')
    .where({ blog_slug: slug })
    .first()
    .select('*')
}

function createBlog(newBlog) {
  return db('skills')
    .insert(newBlog)
    .then(() => {
      return findBlogBySlug(newBlog.blog_slug)
    })
}