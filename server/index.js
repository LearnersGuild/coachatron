require('./env')

const https = require('express-sslify').HTTPS
const express = require('express')
const cookieParser = require('cookie-parser')
const server = express()
const PORT = process.env.PORT

// ensure secure connection
if (process.env.NODE_ENV === 'production') {
  server.use(https({trustProtoHeader: true}))
}

server.use(cookieParser())

require('./authentication')(server)

server.get('/', (req, res) => {
  const redirectTo = encodeURIComponent(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  const loginURL = `${process.env.IDM_BASE_URL}/sign-in?redirect=${redirectTo}`
  res.send(`
    <h1>Coachatron</h1>
    <a href="${loginURL}">Login</a>
    <a href="${process.env.IDM_BASE_URL}/auth/sign-out">Sign-out</a>
    <pre>${JSON.stringify(req.user, null, 2)}</pre>
  `)
})

server.get('/idm-api-test', (req, res, next) => {
  const query = `
    query ($id: ID!) {
      getUserById(id: $id) {
        id
        email
      }
    }
  `
  req.queryIdm(query, {id: req.utser.id})
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      })
    })
})

server.get('/cycledata', (req, res, next) => {
  const query = `
    query {
      findProjects {
        id
        name
        artifactURL
        cycle {
          cycleNumber
        }
      }
    }
  `
  req.queryGame(query, {})
    .then(results => {
      res.json(results)
    })
    .catch(error => {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      })
    })
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
