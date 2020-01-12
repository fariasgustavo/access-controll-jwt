require("dotenv").config({
  path: "./.env"
});
const jwt = require("jsonwebtoken");

module.exports = {
  createToken(user, expiresIn) {
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role_id: user.role_id 
      },
      process.env.SECRET_KEY,
      { expiresIn }
    );

    return token;
  },
};
