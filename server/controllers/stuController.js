const mySQL = require("mysql2");

//create a connection to the DB
let connection = mySQL.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view ALL students
exports.view = (req, res) => {
  //connection to student
  connection.query(
    'SELECT * FROM student WHERE status = "active"',
    (err, rows) => {
      if (!err) {
        let removedStudent = req.query.removed;
        res.render("home", { rows, removedStudent });
      } else {
        console.log("there is a mysql error somewhere");
      }

      console.log("The data from student table: \n", rows);
    }
  );
};

//find student using search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  //user the connection
  connection.query(
    "SELECT * FROM student WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        //rendering the home.hbs file
        res.render("home", { rows });
      } else {
        console.log("there is a mysql error somewhere");
      }
      console.log("The data from student table: \n", rows);
    }
  );
};

//to render the add student form page
exports.form = (req, res) => {
  res.render("add-student");
};

//at the add form page, Create student
exports.create = (req, res) => {
  //we need to deconstruct the data
  //so we can grab it from the body
  const { first_name, last_name, email, phone, comments } = req.body;

  //do the query to insert data into the DB, use ? to prevent SQL injection
  connection.query(
    "INSERT INTO student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        //rendering the add-student.hbs file
        res.render("add-student", { alert: "Student added successfully" });
      } else {
        console.log(err);
      }
      console.log("The data from student table: \n", rows);
    }
  );
};

//render Edit student page which populates the data
exports.edit = (req, res) => {
  //connection to student
  connection.query(
    "SELECT * FROM student WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("edit-student", { rows });
      } else {
        console.log("there is a mysql error somewhere");
      }

      console.log("The data from student table: \n", rows);
    }
  );
};

//Update the populated data from edit.stu page
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  //connection to student
  connection.query(
    "UPDATE student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        //we need the page to render again with the right data

        //connection to student
        connection.query(
          "SELECT * FROM student WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            if (!err) {
              res.render("edit-student", {
                rows,
                alert: `${first_name} has been updated`,
              });
            } else {
              console.log(err);
            }

            console.log("The data from student table: \n", rows);
          }
        );
        //NOT THIS:
        // res.render("edit-student", { rows }); ==which gives rows of the same form
      } else {
        console.log("there is a mysql error somewhere");
      }

      console.log("The data from student table: \n", rows);
    }
  );
};

//delete student
exports.delete = (req, res) => {
  //connection to student
  connection.query(
    "UPDATE student SET status = ? WHERE id = ?",
    ["removed", req.params.id],
    (err, rows) => {
      if (!err) {
        let removedStudent = encodeURIComponent("Student successfully removed");
        res.redirect("/?removed=" + removedStudent);
      } else {
        console.log(err);
      }
      console.log("The data from student table: \n", rows);
    }
  );
};

//view ONE student
exports.viewone = (req, res) => {
  //connection to student
  connection.query(
    "SELECT * FROM student WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-student", { rows });
      } else {
        console.log("there is a mysql error somewhere");
      }

      console.log("The data from student table: \n", rows);
    }
  );
};
