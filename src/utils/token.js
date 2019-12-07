const jwt = require("jsonwebtoken");

module.exports = {
  createToken(user) {
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role_id: user.role_id 
      },
      "accessToken",
      { expiresIn: 30 }
    );

    return token;
  },

  refresToken(token) {},

  authorize(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      res
        .status(401)
        .send({ message: "You has not permition to access this content" });
      return;
    }

    jwt.verify(token, "accessToken", function(err, decoded) {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      }else{
        next();
      }
    });
  },

  async decodeToken(token) {
    const data = await jwt.verify(token, "accessToken");

    return data;
  },  
};
