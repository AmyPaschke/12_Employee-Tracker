const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "ilovejosh3",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected at " + connection.threadId + "\n");
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Roles",
        "Add Employees",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.choice) {
        case "View all Employees":
          allEmployees();
          break;
        case "View all Departments":
          allDepartments();
          break;
        case "View all Roles":
          allRoles();
          break;
        case "Add Employees":
          addEmployees();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

//function displaying all employees
function allEmployees() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;";
  return connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

//left joining departments table with both tables
function allDepartments() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

//left joining roles table with employee table
function allRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.table([res[i]]);
    }
    runSearch();
  });
}

//function to add employees
//
function addEmployees() {
  let roles;
  let query = "SELECT id, title FROM role";
  connection.query(query, async function (err, res) {
    if (err) throw err;
    roles = await res.map((row) => row.title);

    // let finalRoles = roles.map((item) => {
    //   return item.name;
    // });
    console.log(roles);
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employees last name?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the employees role?",
          choices: roles,
        },
      ])
      .then((answer) => {
        console.log(answer);
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: id,
          },
          function (err) {
            if (err) throw err;
            runSearch();
          }
        );
      });
  });
}
