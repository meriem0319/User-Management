const express = require("express");

const router = express.Router();

const stuController = require("../controllers/stuController");

//create, search, update, delete
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
//route to update the infor rendered from edit student
router.post("/editstudent/:id", stuController.update);
//route to view single student data
router.get("/viewstudent/:id", stuController.viewone);

//route to delete record using ids
router.get("/:id", stuController.delete);

module.exports = router;
