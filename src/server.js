import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

dotenv.config({ path: './.env' });

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

// eslint-disable-next-line no-console
server.listen(process.env.SERVER_PORT, () => console.log(`server listening on port ${process.env.SERVER_PORT}`));
