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
  }
  // console.log(`Connected to the office_db database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});

function trackEmployees() {
  console.log("\n**----- MAIN MENU -----**");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome! How would you like to proceed?",
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

        case "Update Employee Role":
          updateEmployee();
          break;

        case "Restart":
          trackEmployees();
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
    console.log("\n**----- ALL DUNDER MIFFLIN DEPARTMENTS -----**");
    console.log(table);
    console.log("\n**----- Arrow up or down to continue -----**");
  });
  trackEmployees();
}

function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) console.log(err);
    const table = cTable.getTable(res);
    console.log("\n**----- ALL DUNDER MIFFLIN ROLES -----**");
    console.log(table);
    console.log("\n**----- Arrow up or down to continue -----**");
  });
  trackEmployees();
}

function viewEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, res) => {
    if (err) console.log(err);
    const table = cTable.getTable(res);
    console.log("\n**----- ALL DUNDER MIFFLIN EMPLOYEES -----**");
    console.log(table);
    console.log("\n**----- Arrow up or down to continue -----**");
  });
  trackEmployees();
}

function updateEmployee() {
  db.query(
    "SELECT id, first_name, last_name from employee",
    (err, res) => {
      if (err) throw err;
      const employeeNames = res.map(
        ({ id, first_name, last_name }) => `${id}: ${first_name} ${last_name}`
      );
      db.query("SELECT id, title from role", (err, res) => {
        if (err) throw err;
        const employeeRoles = res.map(
          ({ id, title }) => `${id}: ${title}`
        );
        inquirer
          .prompt([
            {
              type: "list",
              choices: employeeNames,
              name: "selectedEmp",
              message: "Which employee has changed roles?",
            },
            {
              type: "list",
              choices: employeeRoles,
              name: "selectedRole",
              message: "What is their new role?",
            },
          ])
          .then(({ selectedEmp, selectedRole }) => {
            let id = selectedEmp.split(":")[0];
            let role_ID = selectedRole.split(":")[0];
            db.query(
              "UPDATE employee SET role_ID = ? WHERE id = ?",
              [role_ID, id],
              (err, success) => {
                if (err) throw err;
                console.log(`The employee has been updated!`);
                trackEmployees();
              }
            );
          });
      });
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
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
    ])
    .then((answer) => {
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
          console.log("\n**----- Arrow up or down to continue -----**");
          trackEmployees();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role ID?",
        name: "addRoleID",
      },
      {
        type: "input",
        message: "What is the job title?",
        name: "addRoleName",
      },
      {
        type: "input",
        message: "What is the salary?",
        name: "addRoleSalary",
      },
      {
        type: "input",
        message: "What is the department ID?",
        name: "addRoleDepartment",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?);",
        [
          answer.addRoleID,
          answer.addRoleName,
          answer.addRoleSalary,
          answer.addRoleDepartment,
        ],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log("\n**----- Arrow up or down to continue -----**");
          trackEmployees();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department ID?",
        name: "addDeptID",
      },
      {
        type: "input",
        message: "What is the department name?",
        name: "addDeptName",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (id, name) VALUES (?, ?);",
        [answer.addDeptID, answer.addDeptName],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log("\n**----- Arrow up or down to continue -----**");
          trackEmployees();
        }
      );
    });
}

function quit() {
  db.end();
  process.exit();
}

trackEmployees();
