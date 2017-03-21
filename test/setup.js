process.env.NODE_ENV = 'test'

const chai = require('chai')
const database = require('../server/database')

global.expect = chai.expect
global.moment = require('moment')

beforeEach(database.reset)
