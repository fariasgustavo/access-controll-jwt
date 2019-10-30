const mysql = require('mysql');
const {host,user,database: name,password,port} = require('./config/database');

const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database
});

const execQuery = (query, res) => {
    connection.query(query,function(error, results, fields){
        if(error) 
            res.json(error);
        else
            res.json(results);
            
        console.log('executou!');
    })
}

module.exports = {
    connection,
    execQuery
};
