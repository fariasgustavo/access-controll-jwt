import knex from '../database.js';

export default {
  async findOne(id) {
    const role = await knex('roles').where('id', id);

    return role[0];
  },
};
