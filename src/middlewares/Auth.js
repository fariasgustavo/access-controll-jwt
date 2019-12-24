require("dotenv").config({
  path: "./.env"
});

const jwt = require("jsonwebtoken");
const UserModel = require('../models/UsersModel');
const { createToken } = require("../utils/token");

module.exports = {
  refresToken(req,res) {
    const {token, refreshToken} = req.body;
    
    jwt.verify(refreshToken, process.env.SECRET_KEY, function(err){
      if(err) res.status(401).send({ message: "Invalid refresh token" });
    });

    jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
      if (err) {
        const tokenData = jwt.decode(refreshToken);
        const user = await UserModel.findById(tokenData.sub);      
        const newToken = createToken(user,process.env.TOKEN_EXPIRES);

        res.status(200).send({ token: newToken });
      }else{
        res.status(200).send(decoded);
      }
    });
  },

  authorize(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      res
        .status(401)
        .send({ message: "You has not permition to access this content" });
      return;
    }

    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      }else{
        next();
      }
    });
  },

  async decodeToken(token) {
    const data = await jwt.verify(token, process.env.SECRET_KEY);

    return data;
  },  
};
