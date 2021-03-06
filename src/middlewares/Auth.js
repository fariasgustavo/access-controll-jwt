import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import RoleModel from '../services/RolesService.js';

dotenv.config({ path: './.env' });

export default {
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
        res.status(403).send({ message: "Unauthorized resource for user's role" });
        return;
      }

      next();
    };
  },
};
