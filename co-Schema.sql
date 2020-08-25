-- DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;
CREATE TABLE department(
department_id INT auto_increment PRIMARY KEY,
name VARCHAR(30) NULL
);

CREATE TABLE role(
role_id INT auto_increment primary KEY,
title VARCHAR(30) NULL,
salary DECIMAL(12,2) NULL,
department_id int,
FOREIGN KEY (department_id)
REFERENCES department(department_id)
 ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE employee (
id INT auto_increment PRIMARY KEY,
first_name VARCHAR(30) not NULL,
last_name VARCHAR(30) not NULL,
role_id INT,
FOREIGN KEY(role_id)
REFERENCES role(role_id)
ON UPDATE CASCADE
ON DELETE CASCADE,
manager_id INT
);
 







-- USE company_DB;
-- INSERT INTO department ( id , name)  VALUES ( 1 , "sales");
-- INSERT INTO role (id , title, salary)  VALUES (1, "sales person", 75000.00);
-- INSERT INTO employee (id, first_name, last_name)  VALUES (1 , "Joe", "Salesman Jr");

USE company_DB;
INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("Account Payables");
INSERT INTO department (name) VALUES ("R&D");
INSERT INTO department (name) VALUES ("Management");

INSERT INTO role ( title, salary,department_id) VALUES ( "CEO", 275000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ( "manager_sales", 85000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ( "manager_AP", 65000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ( "manager_R&D", 65000.00, 3);
INSERT INTO role ( title, salary,department_id)  VALUES ( "sales person", 75000.00, 1);

INSERT INTO role (title, salary, department_id)  VALUES ( "Acountant", 85000.00,2);
INSERT INTO role ( title, salary, department_id)  VALUES ("scientist", 105000.00, 3);
INSERT INTO role (title, salary, department_id)  VALUES ("developer", 105000.00, 3);
INSERT INTO role ( title, salary, department_id)  VALUES ("c++_dev", 105000.00,3);

INSERT INTO manager ( first_name, last_name, role_id )  VALUES ("John", "Williams II",1);
INSERT INTO manager ( first_name, last_name, role_id)  VALUES ("Vanessa", "Senior",2);
INSERT INTO manager ( first_name, last_name, role_id)  VALUES ("Anthony", "Ironfist III",3);
INSERT INTO manager ( first_name, last_name, role_id)  VALUES ("George", "Van Helsing",4);



-- INSERT INTO employee ( first_name, last_name, role_id)  VALUES ("John", "Williams II",1);
-- INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("Vanessa", "Senior",2,1);
-- INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("Anthony", "Ironfist III",3,1);
-- INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("George", "Van Helsing",4,1);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ( "Joe", "Salesman Jr",5,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ("Mike", "Salesman Sr",5,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ("Tim", "Smith ,Dr", 7,3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ("Jack", "Fullstackson",7,3 );
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("Joe", "Salesman Jr",5,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)  VALUES ("George", "Forman",5,2);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ( "Speedy", "Gonzales Jr",8,3);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ( "Josh", "Van Goh",9,3);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("Dim", "crosswind",8,3);
INSERT INTO employee ( first_name, last_name, role_id, manager_id)  VALUES ("Bob", "Bilderoff",6,4);


use company_DB;
SELECT * FROM department;
SELECT * FROM role;
select * from employee;
select * from manager;