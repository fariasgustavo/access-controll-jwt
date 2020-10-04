import knex from '../database.js';

export default {
  async findOne(email, password) {
    const user = await knex('users').where({
      email,
      password,
    });

    return user[0];
  },
  async findById(id) {
    const user = await knex('users').where({ id });

    return user[0];
  },
  async all() {
    const users = await knex('users');

    return users;
  },
};
