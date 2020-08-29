import knex from 'knex';
import databaseConfig from './config/database.js';

export default knex({
  client: 'mysql',
  connection: {
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    port: databaseConfig.port,
  },
});
