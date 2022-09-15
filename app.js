const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mySQL = require("mysql2");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//parsing middleware, parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Have access to our img/css/js files if we need them in the public folder
app.use(express.static("public"));

//Set up the templating engine: handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

//create a connection to the DB
const pool = mySQL.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//connect to DB
pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log("connected as ID " + connection.threadId); //yay we're connected
});

//Router
// app.get("", (req, res) => {
//   res.render("home");
// });

const routes = require("./server/routes/student");
app.use("/", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
