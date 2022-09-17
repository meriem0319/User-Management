const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");


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

const routes = require("./server/routes/student");
app.use("/", routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
