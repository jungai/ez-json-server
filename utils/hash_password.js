var bcrypt = require('bcryptjs')

function hashPassword (rawPassword) {
  return bcrypt.hashSync(rawPassword, 10)
}

module.exports = hashPassword
