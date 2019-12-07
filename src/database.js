const {
  host,
  user,
  name: database,
  password,
  port
} = require("./config/database");

const knex = require("knex")({
  client: "mysql",
  connection: {
    host,
    user,
    password,
    database,
    port
  }
});

module.exports = knex;
