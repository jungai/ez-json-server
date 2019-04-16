var bcrypt = require('bcryptjs')
var hassPassword = require('./hash_password')

function verifyPassword (rawPassword, hash) {
  // var hash = hassPassword(rawPassword)
  return bcrypt.compareSync(rawPassword, hash)
}

module.exports = verifyPassword
