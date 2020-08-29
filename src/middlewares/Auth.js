import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UsersModel.js';
import RoleModel from '../models/RolesModel.js';
import Token from '../utils/token.js';

dotenv.config({ path: './.env' });

export default {
  refresToken(req, res) {
    const refreshToken = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(refreshToken, process.env.SECRET_KEY, async (err) => {
      if (err) {
        res.status(401).send({ message: 'Invalid refresh token' });
      } else {
        const tokenData = jwt.decode(refreshToken);
        const user = await UserModel.findById(tokenData.sub);
        const newToken = Token.createToken(user, process.env.TOKEN_EXPIRES);
        const newRefreshToken = Token.createToken(user, process.env.REFRESH_TOKEN_EXPIRES);

        res.status(200).send({ token: newToken, refresToken: newRefreshToken });
      }
    });
  },
  authorize(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
      res.status(401).send({ message: 'You has not permition to access this content' });
      return;
    }

    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        next();
      }
    });
  },
  authorizeByRole(roleList) {
    return async (req, res, next) => {
      const token = req.headers.authorization.replace('Bearer ', '');
      const userData = jwt.decode(token);

      const { role_id } = userData;
      const userRole = await RoleModel.findOne(role_id);

      const { title: userRoleTitle } = userRole;

      const hasRolePermitions = roleList.some(role => role === userRoleTitle);

      if (!hasRolePermitions) {
        res.status(403).send({ message: "unauthorized resource for user's role" });
        return;
      }

      next();
    };
  },
};
