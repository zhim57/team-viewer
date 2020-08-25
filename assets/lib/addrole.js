var inquirer = require("inquirer");
var util = require("util");
var { promisify } = require("util");
var connectionQuery = require("../../config/connection");
var connection = require("../../config/connection");
const { isNumber, isString } = require("util");
connectionQuery = util.promisify(connection.query.bind(connection));
var orm = require("../../config/orm");

module.exports =
function(start){
 return function addRole() {
    let departments;
    return connectionQuery("select * From department")
      .then(departmentsData => {
        // console.log(departmentsData);
        departments = departmentsData;

        let departmentsChoices = departments.map(department => {
          // console.log({ department });
          return {
            name: department.name,
            value: department.department_id
          }
        })

        return inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "Enter Role Title: ",
            validate: function (value) {
              let valVar = /[- . \w]/gi;
              let match1 = value.match(valVar);
              let match = match1.join('');
              if (value != match) {
                return "please use alphanumeric characters ,  Max length <30";
              } else {
                return true;
              }
            }
          },
          {
            name: "salary",
            type: "input",
            message: "Please input the salary for this Role: ",
            validate: function (d) {
              let valInt = /[ . \d]/gi;
              let match1 = d.match(valInt);
              let match = match1.join('');
              if (d != match) {
                return "please use digits and '.' only";
              } else {
                return true;
              }
            }
          },
          {
            name: "department_id",
            type: "list",
            message: "Please select the department id for this Role ",
            choices: departmentsChoices
          }
        ])
          .then(answer => {
            var queryString = "INSERT INTO ?? SET title = ?, salary = ?, department_id = ?";
            return connectionQuery(queryString, ["role", answer.title, answer.salary, answer.department_id])
              .then(function (res) {
                
                console.table(res);
                start();
                // console.log("Please run 'node server' for the next operation");
              });
          });

      });
  };
}
  


