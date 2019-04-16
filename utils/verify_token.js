const jwt = require('jsonwebtoken')

const SECRET_KEY = 'miketeng1'
const expiresIn = '1h'

function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

module.exports = verifyToken