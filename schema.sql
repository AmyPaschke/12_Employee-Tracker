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


INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance"), 
("Legal"), ("Misc");

INSERT INTO employee (first_name, last_name) VALUES ("Amy", "Paschke");

SELECT * FROM employee;

