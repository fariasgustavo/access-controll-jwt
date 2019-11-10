const express = require("express");
const routes = express.Router();
const UserController = require("./controllers/UserController");

routes.post("/login", UserController.login);

module.exports = routes;
