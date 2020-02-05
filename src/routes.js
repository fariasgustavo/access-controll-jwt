const express = require("express");
const routes = express.Router();
const Auth = require("./middlewares/Auth");
const UserController = require("./controllers/UserController");

routes.post("/login", UserController.login);
routes.get("/refresh-token",Auth.refresToken)
routes.get("/users", Auth.authorize, UserController.getAll);

module.exports = routes;
