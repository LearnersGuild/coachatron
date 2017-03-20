exports.up = (knex, Promise) =>
  Promise.all([

    knex.schema.createTable('players', table => {
      table.string('handle').notNullable()
      table.boolean('choach').notNullable()
      table.boolean('on_duty').notNullable()
    }),

    knex.schema.createTable('teams', table => {
      table.integer('project_id').notNullable()
      table.string('name').notNullable()
    }),

    knex.schema.createTable('team_players', table => {
      table.integer('team_id').notNullable()
      table.integer('player_id').notNullable()
    }),

    knex.schema.createTable('projects', table => {
      table.string('url').notNullable()
    }),

    knex.schema.createTable('project_coaches', table => {
      table.string('url').notNullable()
    }),

    knex.schema.createTable('requests', table => {
      table.integer('team_id').notNullable()
      table.timestamp('created_at')
      table.timestamp('resolved_at')
    }),

    knex.schema.createTable('request_events', table => {
      table.integer('request_id').notNullable()
      table.integer('type').notNullable()
      table.text('description')
      table.timestamp('created_at')
    }),

  ])


exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('pull_request_review_requests'),
  ])
