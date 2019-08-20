const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const Users = require('./user-model.js')
const restricted = require('../middleware/restricted.js/index.js')

router.get('/users', restricted, (request, response) => {
  Users.find()
    .then(users => {
      response.json(users)
    })
    .catch(error => {
      console.log(error)
      response.send(error)
    })
})

router.post('/login', (request, response) => {
  const { email, password } = request.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        request.session.user = user.email //adding data to our cookie
        request.session.loggedIn = true;
        response.status(200).json({ message: `Welcome ${user.email}!` });
      } else {
        response.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      response.status(500).json(error)
    });
})

router.post('/initialize', (request, response) => {
  let { email, password } = request.body
  const hash = bcrypt.hashSync(user.password);
  user.password = hash

  if (email === 'samantha.c.egge@gmail.com') {
    Users.add(user)
      .then(created => {
        response.status(201).json(created)
      })
  } else {
    response.status(401).json({ message: 'This account is not available for admin' })
  }
})

router.get('/admin/logout', restricted, (request, response) => {
  request.session.destroy(function(error) {
    response.status(200).json({ message: 'You have been logged out' })
  })
})

module.exports = router