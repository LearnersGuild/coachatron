const knex = require('./knex')


const all = () =>
  knex
    .select('*')
    .from('requests')


module.exports = {
  all,
}
