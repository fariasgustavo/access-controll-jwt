const knex = require("../database");

module.exports = {
  async getByTitle(title) {
    const role = await knex("roles").where("title", title);

    return role[0];
  }
};
