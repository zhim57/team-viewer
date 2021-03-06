var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("table");
var util = require("util");
var { promisify } = require("util");

var connectionQuery = require("../../config/connection");
var connection = require("../../config/connection");
const Choices = require("inquirer/lib/objects/choices");
connectionQuery = util.promisify(connection.query.bind(connection));



module.exports =
  function (start) {
    return function updateEmployeeRole() {

      let roles;
      let managers;

      return connectionQuery("select * From role")
        .then(rolesData => {
          roles = rolesData;
          return connectionQuery("select * from employee")
        })
        .then(managersData => {

          managers = managersData;

          let rolesChoices = roles.map(role => {
            return {
              name: role.title,
              value: role.role_id
            }
          });

          let managersChoices = managers.map(manager => {
            return {
              name: manager.first_name + " " + manager.last_name,
              value: manager.id
            }

          });
          let employeesChoices = managers.map(employee => {
            return {
              name: employee.first_name + " " + employee.last_name,
              value: employee.id
            }
          });
          managersChoices.push(
            { name: "No Manager", value: null }
          )

          return inquirer.prompt([
            {
              name: "id",
              type: "list",
              message: "Please select the Employee you wish to update",
              choices: employeesChoices
            },

            {
              name: "role_id",
              type: "list",
              message: "Please select the NEW role for this employee,",
              choices: rolesChoices

            }
          ])
            .then(response => {
              var query = `UPDATE employee SET role_id=?  WHERE id = ?`;
              connection.query(query, [response.role_id, response.id], function (err, res) {
                if (err) throw err;

                console.table(res);
                connection.end();
                // console.log("Please run 'node server' for the next operation");
                start();
              });
            });


        })
    };

  }