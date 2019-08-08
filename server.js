const express = require('express')
const blogRoutes = require('./blog/blogRouter')

const server = express();
server.use(express.json())

