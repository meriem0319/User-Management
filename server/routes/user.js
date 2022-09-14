const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

//create, find, delete, update
router.get("/", userController.view);

//router taken from app.js
// router.get("", (req, res) => {
//   res.render("home");
// });

module.exports = router;
