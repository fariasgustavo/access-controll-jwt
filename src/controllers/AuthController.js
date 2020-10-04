import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserService from '../services/UsersService.js';
import RefreshTokenModel from '../services/RefreshTokenService.js';
import Token from '../utils/token.js';

dotenv.config({ path: './.env' });

export default {
  async token(req, res) {
    const { grantType } = req.headers;

    if (grantType === 'refresh-token') {
      const token = req.headers.authorization.replace('Bearer ', '');

      jwt.verify(token, process.env.SECRET_KEY, async (err) => {
        if (err) {
          res.status(401).send({ message: 'Invalid refresh token' });
        } else {
          const tokenData = jwt.decode(token);
          const user = await UserService.findById(tokenData.sub);
          const newToken = Token.createToken(user, process.env.TOKEN_EXPIRES);
          const newRefreshToken = Token.createToken(user, process.env.REFRESH_TOKEN_EXPIRES);

          res.status(200).send({ token: newToken, refresToken: newRefreshToken });
        }
      });
    }

    if (!req.body.email || !req.body.password) {
      res.status(400).send('Email or password not send in request');
      return;
    }

    const { email, password } = req.body;

    const user = await UserService.findOne(email, password);

    if (!user) {
      res.status(401).send('User not found');
      return;
    }

    const token = Token.createToken(user, process.env.TOKEN_EXPIRES);
    const refreshToken = Token.createToken(user, process.env.REFRESH_TOKEN_EXPIRES);

    await RefreshTokenModel.create(token);

    res.status(200).send({ token, refreshToken });
  },
};
