require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

// eslint-disable-next-line no-console
server.listen(process.env.SERVER_PORT, () => console.log(`server listening on port ${process.env.SERVER_PORT}`));
