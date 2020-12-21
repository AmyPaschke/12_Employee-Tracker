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
function querying() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.log("results: " + results);
    connection.end();
  });
}
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
      switch (answer.action) {
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
function allEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.table([res[i]]);
    }
    runSearch();
  });
}
function allDepartments() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.table([res[i]]);
    }
    runSearch();
  });
}
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
function addEmployees() {
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
        choices: [
          "Sales Manager",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Lawyer",
          "Intern",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
        },
        function (err) {
          if (err) throw err;
          console.log("Congratulations on your new job!");
          runSearch();
        }
      );
    });
}
