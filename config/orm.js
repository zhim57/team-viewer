var connection = require("./connection.js");
var { promisify } = require("util");
var connectionQuery = promisify(connection.query.bind(connection));

// Object Relational Mapper (ORM)
// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

var orm = {
  addDepartment: function (tableInput, valOfCol) {
    console.log(valOfCol + " added");
    var queryString = "INSERT INTO ?? SET name = ?";
    return connectionQuery(queryString, [tableInput, valOfCol])
      .then(function (result) {
      });
  },

  delEmployee: function (valOfCol1) {
    var queryString = `DELETE FROM employee WHERE id = ?`;
    return connectionQuery(queryString, [valOfCol1])
      .then(function (result) {
      });
  },

  delDepartment: function (valOfCol3) {
    var queryString = `DELETE FROM department WHERE department_id = ?`;
    return connectionQuery(queryString, [valOfCol3])
      .then(function (result) {
      });
  },

  delRole: function (valOfCol5) {
    var queryString = `DELETE FROM role WHERE role_id = ? `;
    return connectionQuery(queryString, [valOfCol5])
      .then(function (result) {
      });
  },


























  //   selectWhere: function (tableInput, colToSearch, valOfCol) {
  //     var queryString = "SELECT * FROM ?? WHERE ?? = ?";
  //     return connectionQuery(queryString, [tableInput, colToSearch, valOfCol])
  //       .then(function (result) {
  //         console.log(result);
  //       });
  //   },
  //   selectAndOrder: function (whatToSelect, table, orderCol) {
  //     var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
  //     console.log(queryString);
  //     return connectionQuery(queryString, [whatToSelect, table, orderCol])
  //       .then(function (result) {
  //         console.log(result);
  //       });
  //   },
  //   findWhoHasMost: function (tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
  //     var queryString =
  //       "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

  //     return connectionQuery(
  //       queryString,
  //       [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol]
  //     )
  //       .then(function (result) {
  //         console.log(result);
  //       }
  //       );
  //   }
};

module.exports = orm;
