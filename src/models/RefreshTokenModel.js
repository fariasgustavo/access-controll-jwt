import jwt from 'jsonwebtoken';
import knex from '../database.js';

export default {
  async create(token) {
    try {
      const { sub: userId } = jwt.decode(token);
      const result = knex('refresh_tokens').insert({ user_id: userId, token });

      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
};
