const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

module.exports = {
  findAllBlogs,
  findBlogBySlug
}

// TODO: Inverse this so it goes newest to oldest
function findAllBlogs() {
  return db('blog')
    .select('*');
}

function findBlogBySlug(slug) {
  return db('blog')
    .where({ })
}