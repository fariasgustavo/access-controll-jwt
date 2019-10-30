const express = require('express');
const jwt = require('jsonwebtoken');
const { execQuery } = require('./database-connect');

const routes = express.Router();

routes.get('/login',(req,res) => {
    execQuery('SELECT *FROM users', res);
});