const config = require('./core/config');

module.exports = {
  development: {
    client: config.database.client,
    connection: {
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
    },
    migrations: {
      directory: './migrations',
    },
  },
};
