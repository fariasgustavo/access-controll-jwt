const knex = require("../database");

module.exports = {
  async findOne(id) {
    const role = await knex("roles").where("id", id);

    return role[0];
  }
};
