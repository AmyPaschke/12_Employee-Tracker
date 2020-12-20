let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add Employee",
        "Quit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          employeeSearch();
          break;

        case "View all departments":
          departmentSearch();
          break;

        case "View all roles":
          roleSearch();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
}

function employeeSearch() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].employee);
    }
    runSearch();
  });
}

function departmentSearch() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].department);
    }
    runSearch();
  });
}

function roleSearch() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].role);
    }
    runSearch();
  });
}

function addEmployee() {
  inquirer
    .prompt(
      {
        name: "employeeFirst",
        type: "input",
        message: "What is your employee's first name?",
      },
      {
        name: "employeeSecond",
        type: "input",
        message: "What is your employee's last name?",
      },
      {
        name: "employeeRole",
        type: "list",
        message: "What is your employee's role?",
        choices: [
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
          "Intern",
        ],
      }
    )
    .then(function (answer) {
      let query = "INSERT INTO employee SET ?";
      connection.query(
        query,
        {
          first_name: answer.employeeFirst,
          last_name: answer.employeeLast,
          //add a for loop to loop through ids?
        },
        function (err, res) {
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
            console.log(
              "Position: " +
                res[i].position +
                " || Song: " +
                res[i].song +
                " || Year: " +
                res[i].year
            );
          }
          runSearch();
        }
      );
    });
}

// function roleSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then(function (answer) {
//       let query =
//         "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function (err, res) {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function addEmployee() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?",
//     })
//     .then(function (answer) {
//       console.log(answer.song);
//       connection.query(
//         "SELECT * FROM top5000 WHERE ?",
//         { song: answer.song },
//         function (err, res) {
//           if (err) throw err;
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         }
//       );
//     });
// }
