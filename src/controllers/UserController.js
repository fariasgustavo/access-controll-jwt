import UsersService from '../services/UsersService.js';

export default {
  async all(req, res) {
    const users = await UsersService.all();
    res.status(200).send(users);
  },
};
