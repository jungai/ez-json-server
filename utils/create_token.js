const jwt = require('jsonwebtoken')

const SECRET_KEY = 'miketeng1'
const expiresIn = '1h'

function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

module.exports = createToken