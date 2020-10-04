import UsersModel from '../services/UsersService.js';

export default {
  async getAll(req, res) {
    const users = await UsersModel.all();
    res.status(200).send(users);
  },
};
