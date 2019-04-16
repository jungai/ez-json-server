var bcrypt = require('bcryptjs')

function verifyPassword (rawPassword, hash) {

  return bcrypt.compareSync(rawPassword, hash)
}

module.exports = verifyPassword
