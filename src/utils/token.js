import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: './.env' });

export default {
  createToken(user, expiresIn) {
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role_id: user.role_id,
      },
      process.env.SECRET_KEY,
      { expiresIn },
    );

    return token;
  },
};
