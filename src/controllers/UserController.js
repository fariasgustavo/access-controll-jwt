const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("Email or password not send in request");
      return;
    }

    const { email, password } = req.body;

    const user = await UsersModel.findOne(email, password);

    if (!user.length) {
      res.status(401).send("Unauthorized: user not found");
      return;
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email
      },
      "accessToken",
      { expiresIn: "3 hours" }
    );

    res.status(200).send({ token });

    return;
  }
};
