const jwt = require('jsonwebtoken');
const knex = require('../database');

module.exports = {
  async create(token) {
    try {
      const { id: userId } = jwt.decode(token);
      const result = knex('refresh_tokens').insert({ userId, token });

      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
};
