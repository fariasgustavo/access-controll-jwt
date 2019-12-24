require("dotenv").config({
  path: "./.env"
});
const UsersModel = require("../models/UsersModel");
const RefreshTokenModel = require("../models/RefreshTokenModel");
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

    const token = createToken(user,process.env.TOKEN_EXPIRES);
    const refreshToken = createToken(user,process.env.REFRESH_TOKEN_EXPIRES);

    RefreshTokenModel.create(token);

    res.status(200).send({ token, refreshToken });

    return;
  },

  async getAll(req, res){
    const users = await UsersModel.all();
    res.status(200).send(users);

    return;
  }
};
