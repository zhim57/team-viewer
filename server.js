var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("table");
const { Table } = require('console-table-printer');
var util = require("util");
var connection = require("./config/connection.js");
var { promisify } = require("util");
// orm = require("./config/orm");

var orm = require("./config/orm");
var connectionQuery = require("./config/connection");
var connection = require("./config/connection");
const Choices = require("inquirer/lib/objects/choices");
connectionQuery = util.promisify(connection.query.bind(connection));

const updateEmployeeRole = require('./assets/lib/updateemployeerole');
const addEmployee = require('./assets/lib/addemployee');
const updateEmployeeManager = require('./assets/lib/updateemployeemanager');
const addRole = require('./assets/lib/addrole');
const { isNumber, isString } = require("util");


function start() {

  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "Add a department",
      "Add a role",
      "Add an Employee",
      "view departments ",
      "view roles",
      "view Employees",
      "Update Employee role",
      "Update an Employee manager",
      "View Employees by manager",
      "Delete a department, a role and/or an employee",
      "View the total utilized budget of a Department",  // combined salariesof all employees in that department
    ]
  })
    .then(function (answer) {
      switch (answer.action) {

        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole(start)();
          break;
        case "Add an Employee":
          addEmployee(start)();
          break;
        case "view departments ":
          viewDepartments();
          break;
        case "view roles":
          viewRoles();
          break;
        case "view Employees":
          viewEmployees();
          break;
        case "Update Employee role":
          updateEmployeeRole(start)();
          break;

        case "Update an Employee manager":
          updateEmployeeManager(start)();
          break;

        case "View Employees by manager":
          viewEmployeesByManager();
          break;

        case "Delete a department, a role and/or an employee":
          deleteDepartmentsRolesEmployees();
          break;

        case "View the total utilized budget of a Department":
          viewDepartmentBudget();
          break;
        default:
          console.log("please try again")
          start();

      }
    });
}

function addDepartment() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add?"
  }).then(function (answer, err) {
    if (err) throw err;
    orm.addDepartment("department", answer.department);
    start();
  });
};

function viewDepartments() {
  let departments;

  return connectionQuery("select * from department")
    .then(departmentsData => {
      console.log(departmentsData);
      departments = departmentsData;

      let departmentsChoices = departments.map(department => {
        // console.log({ department });
        return {
          name: department.name,
          value: department.department_id,
        }

      });
      // console.log( departmentsChoices );

      inquirer
        .prompt({
          name: "departmentS",
          type: "list",
          message: "Please chose a department to see all employees overseen by him?",
          choices: departmentsChoices
        })
        .then(answer => {

          // (department.department_id=role.department_id) WHERE department.department_id =?
          connectionQuery("SELECT name, role.title, role.salary,first_name, last_name FROM department INNER JOIN role ON (department.department_id=role.department_id) INNER JOIN employee ON (role.role_id= employee.role_id) WHERE department.department_id =?", [answer.departmentS], function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            start();
          });
        });
    });
}
function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);

    start();
  });
}


function viewEmployeesByManager() {


  let managers;

  return connectionQuery("select * from employee")
    .then(managersData => {
      console.log(managersData);
      managers = managersData;

      let managersChoices = managers.map(manager => {
        // console.log({ manager });
        return {
          name: manager.first_name + " " + manager.last_name,
          value: manager.id + " " + manager.first_name + " " + manager.last_name,
        }

      });
      // console.log( managersChoices );

      inquirer
        .prompt({
          name: "managerS",
          type: "list",
          message: "Please chose a manager to see all employees overseen by him?",
          choices: managersChoices
        })
        .then(function (answer) {
          var query = "SELECT first_name, last_name, manager_id, title,  salary FROM employee INNER JOIN role ON (role.role_id = employee.role_id) WHERE manager_id =? ";
          connection.query(query, [parseInt(answer.managerS)], function (err, res) {
            console.table(res);
            start();
          });
        });
    })
}


deleteDepartmentsRolesEmployees = () => {

  let departments;
  let roles;
  let employees;

  return connectionQuery("select * from employee")
    .then(employeesData => {
      // console.log(employeesData);
      employees = employeesData;

      return connectionQuery("select * from role")
    })
    .then(rolesData => {
      // console.log(rolesData);
      roles = rolesData;
      return connectionQuery("select * from department")
    })
    .then(departmentsData => {
      // console.log(departmentsData);
      departments = departmentsData;



      let departmentsChoices = departments.map(department => {
        console.log({ department });
        return {
          name: department.name,
          value: department.department_id
        }
      });

      let rolesChoices = roles.map(role => {
        console.log({ role });
        return {
          name: role.title,
          value: role.role_id
        }

      });
      let employeesChoices = employees.map(employee => {
        return {
          name: employee.first_name + " " + employee.last_name,
          value: employee.id
        }
      });

      employeesChoices.push(
        { name: "No Change", value: null }
      );
      rolesChoices.push(
        { name: "No Change", value: null }
      );
      departmentsChoices.push(
        { name: "No Change", value: null }
      );

      return inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Please select the Employee you wish to delete",
          choices: employeesChoices
        },
        {
          name: "department",
          type: "list",
          message: "Please select the Department you wish to delete",
          choices: departmentsChoices
        },
        {
          name: "role",
          type: "list",
          message: "Please select the Role you wish to delete",
          choices: rolesChoices
        }
      ])
        .then(response => {
          console.table({ response });
          orm.delEmployee(response.employee);
          orm.delDepartment(response.department);
          orm.delRole(response.role);
          start();
        });
    });
}


viewDepartmentBudget = () => {

  let departments;

  return connectionQuery("select * from department")
    .then(departmentsData => {
      console.log(departmentsData);
      departments = departmentsData;

      let departmentsChoices = departments.map(department => {
         return {
          name: department.name,
          value: department.department_id
        }
      });

      inquirer
        .prompt({
          name: "departmentS",
          type: "list",
          message: "Please chose a department to see its utilized budget?",
          choices: departmentsChoices
        })
        .then(function (answer) {
          var query = `SELECT name, title, salary FROM department INNER JOIN role ON (department.department_id=role.department_id) WHERE department.department_id =?`;
          connection.query(query, [answer.departmentS], function (err, res) {
            console.log(answer.departmentS);
            console.table(res);
            let total = 0;
            for (i = 0; i < res.length; i++) {
              total += res[i].salary;
            }
            console.log("The total utilized budget of this department is = $" + total);
            start();
          });
        });
    })
}


start();