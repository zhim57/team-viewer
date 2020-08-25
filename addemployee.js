var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("table");
var util = require("util");
var { promisify } = require("util");
 
var connectionQuery = require("./config/connection");
var connection = require("./config/connection");
connectionQuery = promisify(connection.query.bind(connection));
 

module.exports =
function (start) {
  return function addEmployee() {
    let roles;
    let managers;

    return connectionQuery("select * From role")
      .then(rolesData => {
        // console.log(rolesData);
        roles = rolesData;
        return connectionQuery("select * from employee")
      })
      .then(managersData => {
        // console.log(managersData);
        managers = managersData;

        let rolesChoices = roles.map(role => {
          // console.log({ role });

          return {
            name: role.title,
            value: role.role_id
          }
        });

        let managersChoices = managers.map(manager => {
          // console.log({ manager });

          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id


          }
        })
        managersChoices.push(
          { name: "No Manager", value: null }
        )

        return inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "Please Enter employee's first name",
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
            name: "last_name",
            type: "input",
            message: "Please Enter employee's last name",
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
            name: "role_id",
            type: "list",
            message: "Please input the  id for the role for this employee,",
            choices: rolesChoices

          },
          {
            name: "manager_id",
            type: "list",
            message: "Please select the manager id for this Employee if needed please",
            choices: managersChoices
          }
        ])
          .then(response => {
            // return createEmployee(response);
            // console.table({response});
            var query = `INSERT INTO employee (first_name,last_name, role_id, manager_id)  VALUES (?,?,?,?)`;
            connection.query(query, [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, res) { //, [answer.title, answer.salary,answer.department_id]
              if (err) throw err;
              console.table(res);
              start();
            });
          });
        

      });
  };
}