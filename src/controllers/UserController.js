import UsersService from '../services/UsersService.js';

export default {
  async all(req, res) {
    const users = await UsersService.all();
    res.status(200).send(users);
  },
  async add(req, res) {
    const { email, password, roleId } = req.body;
    const newUser = await UsersService.add({ email, password, roleId });

    res.status(200).send({ id: newUser[0] });
  },
};
