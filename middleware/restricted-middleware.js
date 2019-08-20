const bcrypt = require('bcryptjs')

const Users = require('../user/user-model.js')

module.exports = restricted

function restricted(request, response, next) {
  let { username, password } = request.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next()
        } else {
          response.status(401).json({ message: 'Invalid Credentials' })
        }
      })
      .catch(error => {
        console.log(error)
        response.status(500).json(error)
      })
  } else {
    response.status(400).json({ message: 'Please provide valid credentials' })
  }
}

