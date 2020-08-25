var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("table");
var util = require("util");
var { promisify } = require("util");
// var managerArr= [];
var connectionQuery = require("../../config/connection");
var connection = require("../../config/connection");
const Choices = require("inquirer/lib/objects/choices");
connectionQuery = util.promisify(connection.query.bind(connection));
const restartMain = require("../../server");
// const remoteStart = require("./server");


module.exports =
function (start) {
  return function updateEmployeeManager() {

    let managers;

    return connectionQuery("select * from employee")
      .then(managersData => {
        console.log(managersData);
        managers = managersData;


        let managersChoices = managers.map(manager => {
          // console.log({ manager });

          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id


          }

        });
        let employeesChoices = managers.map(employee => {
          // console.log({ manager });

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
            name: "manager_id",
            type: "list",
            message: "Please select the NEW manager Employee ",
            choices: managersChoices
          }
        ])
          .then(response => {
            // return createEmployee(response);

            // console.table({ response });

            // var query = `INSERT INTO employee (first_name,last_name, role_id, manager_id)  VALUES (?,?,?,?)`;
            // UPDATE employee SET first_name=?, last_name=?,role_id=? WHERE id = "Rocky Road"

            // UPDATE employee SET first_name="Vanessa", last_name= "SeniorIII" , role_id="3", manager_id="2" WHERE id = "1";
            var query = `UPDATE employee SET  manager_id=? WHERE id = ?`;
            connection.query(query, [response.manager_id, response.id], function (err, res) { //, [answer.title, answer.salary,answer.department_id]
              if (err) throw err;
              console.table(res);
              start();
            });
          });
        // `INSERT INTO role (title, salary, department_id)  VALUES ( "manager_AP", 65000.00, 2)`

      });
  }

}