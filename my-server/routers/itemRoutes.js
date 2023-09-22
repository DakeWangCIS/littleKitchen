const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const authenticateToken = require('../middleware/authenticateToken');

// define a router to retrieve all the items' information
router.get('/', itemController.getAllItems);

// define a router to retrieve an item's information
router.get('/:name', itemController.getItemByName);

// define a router to retrieve items' information by category
router.get('/category/:category', itemController.getItemsByCategory);

// define a router to add a new item
router.post('/', authenticateToken, itemController.addItem);

// define a router to update an item's information
router.put('/:name', authenticateToken, itemController.updateItem);

// define a router to delete an item
router.delete('/:name', authenticateToken, itemController.deleteItem);

module.exports = router;