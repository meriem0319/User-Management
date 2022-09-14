const mySQL = require("mysql2");

//create a connection to the DB
const pool = mySQL.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view users
exports.view = (req, res) => {
  //router taken from app.js
  // router.get("", (req, res) => {
  //   res.render("home");
  // });

  //connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log("connected as ID " + connection.threadId); //yay we're connected

    //user the connection
    connection.query("SELECT * FROM user", (err, rows) => {
      //when connection is done, release it
      connection.release();

      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("there is a mysql error somewhere");
      }

      console.log("The data from user table: \n", rows);
    });
  });
};
