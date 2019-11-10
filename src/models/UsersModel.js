const knex = require("../database");

module.exports = {
  async findOne(email, password) {
    const user = await knex("users").where({
      email: email,
      password: password
    });

    return user;
  }
};
