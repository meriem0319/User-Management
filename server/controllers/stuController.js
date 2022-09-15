const mySQL = require("mysql2");

//create a connection to the DB
const pool = mySQL.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view ALL students
exports.view = (req, res) => {
  //router taken from app.js
  // router.get("", (req, res) => {
  //   res.render("home");
  // });

  //connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("connected as ID " + connection.threadId); //yay we're connected

    //connection to student
    connection.query(
      'SELECT * FROM student WHERE status = "active"',
      (err, rows) => {
        //when connection is done, release it
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log("there is a mysql error somewhere");
        }

        console.log("The data from student table: \n", rows);
      }
    );
  });
};

//find student using search
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("connected as ID " + connection.threadId); //yay we're connected

    let searchTerm = req.body.search;
    //user the connection
    connection.query(
      "SELECT * FROM student WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        //when connection is done, release it
        connection.release();

        if (!err) {
          //rendering the home.hbs file
          res.render("home", { rows });
        } else {
          console.log("there is a mysql error somewhere");
        }
        console.log("The data from student table: \n", rows);
      }
    );
  });
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

  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("connected as ID " + connection.threadId); //yay we're connected

    //do the query to insert data into the DB, use ? to prevent SQL injection
    connection.query(
      "INSERT INTO student SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //when connection is done, release it
        connection.release();

        if (!err) {
          //rendering the add-student.hbs file
          res.render("add-student", { alert: "Student added successfully" });
        } else {
          console.log(err);
        }
        console.log("The data from student table: \n", rows);
      }
    );
  });
};

//Edit student
exports.edit = (req, res) => {
  res.render("edit-student");
};
