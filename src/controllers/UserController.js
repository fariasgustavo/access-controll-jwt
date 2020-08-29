import dotenv from 'dotenv';
import UsersModel from '../models/UsersModel.js';
import RefreshTokenModel from '../models/RefreshTokenModel.js';
import Token from '../utils/token.js';

dotenv.config({ path: './.env' });

export default {
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send('Email or password not send in request');
      return;
    }

    const { email, password } = req.body;

    const user = await UsersModel.findOne(email, password);

    if (!user) {
      res.status(401).send('User not found');
      return;
    }

    const token = Token.createToken(user, process.env.TOKEN_EXPIRES);
    const refreshToken = Token.createToken(user, process.env.REFRESH_TOKEN_EXPIRES);

    await RefreshTokenModel.create(token);

    res.status(200).send({ token, refreshToken });
  },

  async getAll(req, res) {
    const users = await UsersModel.all();
    res.status(200).send(users);
  },
};
