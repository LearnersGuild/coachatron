require('../env')
const knexfile = require('../../knexfile')
const config = knexfile[process.env.NODE_ENV]
const knex = require('knex')({
  client: 'pg',
  connection: config.connection,
  searchPath: 'knex,public'
});

module.exports = knex
