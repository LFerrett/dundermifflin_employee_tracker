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
          "View All Employees",
          "View All Employees By Roles",
          "View All Employees By Departments",
          "View All Departments",
          "Update Employee",
          "Add Department",
          "Add Employee",
          "Add Role",
          "Restart",
          "Quit",
        ],
      },
    ])
    .then((result) => {
      switch (result.choice) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees By Roles":
          viewEmployeesByRoles();
          break;

        case "View All Employees By Departments":
          viewEmployeesByDepartments();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Update Employee":
          updateEmployee();
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

        case "Restart":
          startScreen();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewEmployees() {
  console.log("View Employees");
}

function viewEmployeesByRoles() {
  console.log("View Employees by roles");
}

function viewEmployeesByDepartments() {
  console.log("View Employees by departments");
}

function viewDepartments() {
  console.log("View All Departments");
}

function updateEmployee() {
  console.log("Update Employee");
}

function addEmployee() {
  console.log("Add Employee");
}

function addRole() {
  console.log("Add Role");
}

function addDepartment() {
  console.log("Add Department");
}

function quit() {
  clear();
  connection.end();
  process.exit();
}

trackEmployees();
