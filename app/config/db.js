'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config(); //for enviroment variables

const connection = mysql.createConnection({
    host: process.env.DB_HOST, //localhost
    port: process.env.DB_PORT, //8889
    user: process.env.DB_USER, //foo
    password: process.env.DB_PASSWORD, //bar
    database: process.env.DB_DATABASE //myblog
});

// connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

//export the connection
module.exports = connection;
