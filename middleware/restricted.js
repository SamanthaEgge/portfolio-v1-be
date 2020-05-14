const bcrypt = require('bcryptjs')

const Users = require('../user/user-model.js')

module.exports = restricted

function restricted(request, response, next) {

  next()
  // if (request.session && request.session.email) {
  //   next();
  // } else {
  //   response.status(401).json({ message: 'No unauthorized access to this part of site' })
  // }
}


////// old code
// let userEmail = session.email

// if (userEmail) {
//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         next()
//       } else {
//         response.status(401).json({ message: 'Invalid Credentials' })
//       }
//     })
//     .catch(error => {
//       console.log(error)
//       response.status(500).json(error)
//     })
// } else {
//   response.status(400).json({ message: 'Please provide valid credentials' })
// }