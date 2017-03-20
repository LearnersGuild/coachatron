require('./env')

const express = require('express')
const server = express()

const PORT = process.env.PORT


server.get('/', (req, res) => {
  res.send('hello')
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
