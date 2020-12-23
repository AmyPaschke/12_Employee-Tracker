DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE  employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id int,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

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

SELECT * FROM role;

INSERT INTO department (name) values ('Law Department');
INSERT INTO role (title, salary, department_id) values ('Lawyer', '100000', 1);
INSERT INTO employee (first_name, last_name, role_id) values ('Amy', 'Paschke', 1);

-- id, firstname, lastname, title, department, salary, manager--
SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name 
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;

-- id, title, salary, department_id, employee first name, employee last name
SELECT role.id, role.title, role.salary, employee.first_name, employee.last_name, department.name 
FROM role
LEFT JOIN employee ON role.id = employee.role_id
LEFT JOIN department ON role.department_id = department.id;




