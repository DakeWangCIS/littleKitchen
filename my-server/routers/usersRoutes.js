const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const userController = require('../controllers/userController.js');

// define a router to retrieve all the users' information
router.get('/', authenticateToken, userController.getAllUsers);

// define a router to retrieve a user's information
router.get('/:id', userController.getUserById);

//  define a router to add a new user
router.post("/register", userController.register);

// define a router to update a user's information
router.put("/:id", userController.updateUser);

// define a router to delete a user
router.delete("/:id", userController.deleteUser);

module.exports = router;