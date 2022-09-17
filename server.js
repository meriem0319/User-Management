const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
// const bodyParser = require("body-parser");
// const mySQL = require("mysql2");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

//parsing middleware, parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Parse application/json
app.use(express.json());

//Have access to our img/css/js files if we need them in the public folder
app.use(express.static("public"));

//Set up the templating engine: handlebars
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, "public")));

//create a connection to the DB
// const pool = mySQL.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

//connect to DB
// pool.getConnection((err, connection) => {
//   if (err) throw err; //not connected
//   console.log("connected as ID " + connection.threadId); //yay we're connected
// });

const routes = require("./server/routes/student");
app.use("/", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
