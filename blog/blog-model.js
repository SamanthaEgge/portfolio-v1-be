const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllBlogs,
  findBlogBySlug,
  createBlog,
  updateBlog
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
  return db('blog')
    .insert(newBlog)
    .then(() => {
      return findBlogBySlug(newBlog.blog_slug)
    })
}

function updateBlog(updateBlog) {
  return db('blog')
    .where({blog_slug: updateBlog.blog_slug})
    .first()
    .update(updateBlog)
}