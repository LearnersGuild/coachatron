require('./server/env')

const defaultConfig = (env) => {
  return {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/server/database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: __dirname + `/server/database/seeds/${env}`
    }
  }
}

module.exports = {
  test: defaultConfig('test'),
  development: defaultConfig('development'),
  production: defaultConfig('production'),
};
