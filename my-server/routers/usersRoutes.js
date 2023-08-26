const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// define a router to retrieve all the students' information
router.get('/', userController.getAllUsers);

// define a router to retrieve a student's information
router.get('/:id', userController.getUserById);

//  define a router to add a new student
router.post("/register", userController.register);

// define a router to update a student's information
router.put("/", userController.updateStudent);

// define a router to delete a student
router.delete("/:id", userController.deleteStudent);

module.exports = router;