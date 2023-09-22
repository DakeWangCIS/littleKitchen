const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authenticateToken = require('../middleware/authenticateToken');

// define a router to retrieve all the categories' information
router.get('/', categoryController.getAllCategories);

// define a router to retrieve a category's information by name
router.get('/:name', categoryController.getCategoryByName);

// define a router to add a new category
router.post('/', authenticateToken, categoryController.addCategory);

// define a router to update a category's information
router.put('/:name', authenticateToken, categoryController.updateCategory);

// define a router to delete a category
router.delete('/:name', authenticateToken, categoryController.deleteCategory);

module.exports = router;
