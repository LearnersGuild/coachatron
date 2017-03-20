process.env.NODE_ENV = 'test'

const chai = require('chai')
const database = require('../server/database')

global.expect = chai.expect

beforeEach(database.reset)
