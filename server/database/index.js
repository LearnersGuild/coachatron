const knex = require('./knex')
const requests = require('./requests')

module.exports = {
  requests,
}

if (process.env.NODE_ENV === 'test'){
  module.exports.reset = () =>
    knex.migrate.latest().then(_ =>
      Promise.all([
        knex.truncate('players'),
        knex.truncate('teams'),
        knex.truncate('team_players'),
        knex.truncate('projects'),
        knex.truncate('project_coaches'),
        knex.truncate('requests'),
        knex.truncate('request_events'),
      ])
    )
}
