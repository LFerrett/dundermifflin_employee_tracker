INSERT INTO department (id, name)
VALUES (01, "Administrative"),
       (02, "Sales"),
       (03, "Accounting"),
       (04, "Customer Service"),
       (05, "Human Resources"),
       (06, "Warehouse");

INSERT INTO role (id, title, salary, department_id)
VALUES (1001, "Regional Manager", 85000, 01),
       (1002, "Office Administrator", 50000, 01),
       (1003, "Receptionist", 40000, 01),
       (2001, "Assistant Regional Manager - Sales", 65000, 02),
       (2002, "Assistant to the Regional Manager - Sales", 60000, 02),
       (2003, "Director of Sales", 50000, 02),
       (2004, "Sales Representative", 40000, 02),
       (2005, "Temp", 30000, 02),
       (3001, "Head of Accounting", 60000, 03),
       (3002, "Accountant", 50000, 03),
       (4001, "Supplier Relations Specialist", 50000, 04),
       (4002, "Customer Service Specialist", 40000, 04),
       (4003, "Quality Assurance Specialist", 40000, 04),
       (5001, "Human Resources Specialist", 50000, 05),
       (6001, "Warehouse Foreman", 60000, 06),
       (6002, "Warehouse Worker", 40000, 06);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1001, NULL),
       ("Pamela", "Halpert", 1002, 57001),
       ("Erin", "Hannon", 1003, 57002),
       ("Jim", "Halpert", 2001, 57001),
       ("Dwight", "Shrute", 2002, 57004),
       ("Phyllis", "Vance", 2003, 57004),
       ("Andy", "Bernard", 2004, 57006),
       ("Stanley", "Hudson", 2004, 57006),
       ("Clark", "Green", 2004, 57006),
       ("Ryan", "Howard", 2005, 57006),
       ("Angela", "Martin", 3001, 57001),
       ("Oscar", "Martinez", 3002, 57012),
       ("Kevin", "Malone", 3002, 57012),
       ("Meredith", "Palmer", 4001, 57001),
       ("Kelly", "Kapoor", 4002, 57015),
       ("Creed", "Bratton", 4003, 57015),
       ("Toby", "Flenderson", 5001, 57001),
       ("Darryl", "Philbin", 6001, 57001),
       ("Roy", "Anderson", 6002, 57019);