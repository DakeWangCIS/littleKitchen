const express = require('express');
const router = express.Router();
const studentController = require('../studentController/studentController.js');

// define a router to retrieve all the students' information
router.get('/', studentController.getAllStudents);

// define a router to retrieve a student's information
router.get('/:id', studentController.getStudentById);

//  define a router to add a new student
router.post("/", studentController.addStudent);

// define a router to update a student's information
router.put("/", studentController.updateStudent);

// define a router to delete a student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;