DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE  employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE CASCADE
);

CREATE TABLE role (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE department (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee_info (
employee_id int,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
title varchar(30) NOT NULL,
department_name varchar(30) NOT NULL,
salary decimal NOT NULL,
manager varchar(30),
foreign key (employee_id) REFERENCES employee (id) ON DELETE CASCADE,
PRIMARY KEY(employee_id)
);



-- id, firstname, lastname, title, department, salary, manager--
SELECT id, first_name, last_name, manager_id 
FROM employee
JOIN employee_info ON employee_info.employee_id = employee.id
JOIN employee_info ON employee_info.first_name = employee.first_name
JOIN employee_info ON employee_info.last_name = employee.last_name
JOIN employee_info ON employee_info.manager = employee.manager_id;

SELECT title, salary
FROM role
INNER JOIN employee_info ON role.title = employee_info.title
INNER JOIN employee_info ON role.salary = employee_info.salary;

SELECT department.name
FROM department
INNER JOIN employee_info ON employee_info.department_name = department.name;






