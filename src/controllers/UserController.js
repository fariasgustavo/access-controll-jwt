const UsersModel = require("../models/UsersModel");
const { createToken } = require("../utils/token");

module.exports = {
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email or password not send in request");
      return;
    }

    const { email, password } = req.body;

    const user = await UsersModel.findOne(email, password);

    if (!user) {
      res.status(401).send("User not found");
      return;
    }

    const token = createToken(user);

    res.status(200).send({ token });

    return;
  },

  async getAll(req, res){
    const users = await UsersModel.all();
    res.status(200).send(users);

    return;
  }
};
