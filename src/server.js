require('dotenv').config({
    path: './.env'
});

const app = require('express');
const cors = require('cors');
const mysqlConnection = require('./database-connect');
const routes = require('./routes');
const server = express();

server.use(cors());
server.use(app.json());
server.use(routes);

mysqlConnection.connect(function(err){
    if(err) return console.log(err);
    console.log(`Database connection has benn already: ${host}/${user}/${database}:${port}`);
});

server.listen(process.env.SERVER_PORT, () => console.log(`server listening on port ${process.env.SERVER_PORT}`));

