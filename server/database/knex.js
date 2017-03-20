require('../env')

const knexfile = require('../../knexfile')
const config = knexfile[process.env.NODE_ENV]
const knex = require('knex')(config)

module.exports = knex
