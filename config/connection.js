const path = require("path");
var mysql = require("mysql");
var util = require("util");
var { promisify } = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password1",
  database: "company_DB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  
});

const connectionQuery = util.promisify(connection.query.bind(connection));

module.exports = connection;
