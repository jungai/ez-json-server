const jsonServer = require('json-server')
const server = jsonServer.create()
const fs = require('fs')
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const hashPassword = require('./utils/hash_password')
const createToken = require('./utils/create_token')
const  verifyPassword = require('./utils/verify_password')
const port = process.env.PORT || 3000
let userdb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', (req, res) => {
  const { email, password } = req.body

  const result = userdb.user.filter(e => e.email === email && (verifyPassword(password, e.passowrd)))
  const token = createToken({name: result.name, email: result.email}) 
  const index = userdb.user.findIndex(u => u.email === email)
  const normalize = Object.assign({}, ...result);
  userdb.user[index] = { ...normalize, token}

  const dataJSON = JSON.stringify(userdb)
  fs.writeFile('db.json', dataJSON, 'utf8', (err) =>
    {
      if (err) { 
        res.send(err)
      }
      res.status(201).send('login')
    }
  );

})


server.post('/custom/user', (req, res) => {
  const { name, email, password } = req.body
  const data = {
    name,
    email,
    passowrd: hashPassword(password)
  }
  
  const cloneObj = [
    ...userdb.user,
    data
  ]
  userdb.user = cloneObj
  const dataJSON = JSON.stringify(userdb)
  fs.writeFile('db.json', dataJSON, 'utf8', (err) =>
    {
      if (err) { 
        res.send(err)
      }
      res.status(201).send('success')
    }
  );
})

server.use(router)

server.listen(port, () => {
  console.log(`JSON Server is running on ${port}`)
})
