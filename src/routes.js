const express = require("express");
const routes = express.Router();
const { authorize } = require("./utils/token");
const UserController = require("./controllers/UserController");

routes.get("/login", UserController.login);
routes.get("/users", authorize, UserController.getAll);

module.exports = routes;
