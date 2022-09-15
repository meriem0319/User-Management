const express = require("express");

const router = express.Router();

const stuController = require("../controllers/stuController");

//route to render the list of students page
router.get("/", stuController.view);
//route to render the search student
router.post("/", stuController.find);
//route to render the add student form page
router.get("/addstudent", stuController.form);
//route to render the create of student
router.post("/addstudent", stuController.create);
//route to render the edit student page
router.get("/editstudent/:id", stuController.edit);

module.exports = router;
