const knex = require("../database");

module.exports = {
  async findOne(email, password) {
    const user = await knex("users").where({
      email: email,
      password: password
    });

    return user[0];
  },

  async all(){
    const users = await knex("users");

    return users;
  }
};
