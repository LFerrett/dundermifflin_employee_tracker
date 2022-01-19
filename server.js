const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to Office database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Mattie123",
    database: "office_db",
  },
  console.log(`Connected to the office_db database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function trackEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Employee",
          "Add Role",
          "Update Employee Role",
          "Restart",
          "Quit",
        ],
      },
    ])
    .then((result) => {
      switch (result.choice) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Restart":
          startScreen();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) console.log(err);
    const table = cTable.getTable(res);
    console.log(table);
  });
  return trackEmployees();
}

function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) console.log(err);
    const table = cTable.getTable(res);
    console.log(table);
  });
  return trackEmployees();
}

function viewEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, res) => {
    if (err) console.log(err);
    const table = cTable.getTable(res);
    console.log(table);
  });
  return trackEmployees();
}

function updateEmployee() {
  console.log("Update Employee");
  return trackEmployees();
}

function addEmployee() {
  inquirer.prompt([{
    type: "input",
    message: "First Name?",
    name: "addFirstName",
  },
  {
    type: "input",
    message: "Last Name?",
    name: "addLastName",
  },
  {
    type: "input",
    message: "Role ID number?",
    name: "addRole",
  },
  {
    type: "input",
    message: "Manager id number?",
    name: "addManagerID",
  },
]).then((answer) => {
  db.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
    [
      answer.addFirstName,
      answer.addLastName,
      answer.addRole,
      answer.addManagerID,
    ],
    (err, res) => {
      if (err) throw err;
      console.table(res);
      trackEmployees();
    }
  );
});
}

function addRole() {
  console.log("Add Role");
  return trackEmployees();
}

function addDepartment() {
  console.log("Add Department");
  return trackEmployees();
}

function quit() {
  clear();
  connection.end();
  process.exit();
}

trackEmployees();
