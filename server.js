const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const BlogRoutes = require('./blog/blog-router.js/index.js')
const UserRoutes = require('./user/user-router.js')
const knexConnection = require('../database/dbConfig.js')

const server = express();

const sessionOptions = {
  name: 'samanthaportfolio',
  secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe!', /// for encryption
  cookie: {
    secure: process.env.COOKIE_SECURE || false, // Should be set to true during production, false for development
    maxAge: 1000 * 60 * 60 * 24 ,  // set in milliseconds (set to 1 day)
    httpOnly: true, // client JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true,
  // store: new KnexSessionStore({  //// start back up once I create db
  //   knex: knexConnection,
  //   createtable: true,
  //   clearInterval: 1000 * 60 * 60
  // })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionOptions))

server.use('/blog', BlogRoutes)
server.use('/', UserRoutes)

server.get('/', (request, response) => {
  response.json({ api: 'up', session: request.session })
})

server.get('/admin', restricted, (request, response) => {
  response.send('Admin pages')
})

module.exports = server