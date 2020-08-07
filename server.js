const express = require('express')
const helmet = require('helmet')
// const cors = require('cors') need to double check my header customs
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const knexConnection = require('./data/dbConfig.js')

const UserRoutes = require('./user/user-router.js')
const CatRoutes = require('./category/category-router.js')
const SkillRoutes = require('./skill/skill-router.js')
const BlogRoutes = require('./blog/blog-router.js')
const FeatRoutes = require('./feature/feature-router.js')


const server = express();

// const sessionOptions = {
//   name: 'samanthaportfolio',
//   secret: process.env.COOKIE_SECRET || 'keep it secret, keep it safe!', /// for encryption
//   cookie: {
//     secure: process.env.COOKIE_SECURE || false, // Should be set to true during production, false for development
//     maxAge: 1000 * 60 * 60 * 24 ,  // set in milliseconds (set to 1 day)
//     httpOnly: true, // client JS has no access to the cookie
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new KnexSessionStore({  //// start back up once I create db
//     knex: knexConnection,
//     createtable: true,
//     clearInterval: 1000 * 60 * 60
//   })
// }

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //req.headers.origin // '*'
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
  res.header('Access-Control-Allow-Credentials', true)
  next();
});

server.use(helmet())
server.use(express.json())
server.use(express())
// server.use(cors())
// server.use(session(sessionOptions))

// server.use('/', UserRoutes)
server.get('/', (req, res) => {
  res.send(`<h1>Server live</h1>`);
});
// server.use('/cats', require(CatRoutes)
// server.use('/skills', SkillRoutes)
// server.use('/blog', BlogRoutes)
// server.use('/feats', FeatRoutes)
server.use('/api/cats', require('./category/category-router'))
server.use('/api/skills', require('./skill/skill-router'))
server.use('/api/blog', require('./blog/blog-router'))
server.use('/api/feats', require('./feature/feature-router'))



// server.get('/', (request, response) => {
//   response.json({ api: 'up', session: request.session })
// })
server.get('/', (req, res) => {
  res.send(`<h1>Server live</h1>`);
});

// server.get('/admin', restricted, (request, response) => {
//   response.send('Admin pages')
// })

module.exports = server