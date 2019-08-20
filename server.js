const express = require('express')

const BlogRoutes = require('./blog/blog-router.js/index.js')
const ProtectedRoutes = require('./protected/protected-router.js')
const UserRoutes = require('./user/user-router.js')

const server = express();

server.use(express.json())
server.use('/blog', blogRoutes)
server.use('/admin', ProtectedRoutes)
server.use('/admin', UserRoutes)

module.exports = server