import {
  host, user, name as database, password, port,
} from './config/database';

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    database,
    port,
  },
});

export default knex;
