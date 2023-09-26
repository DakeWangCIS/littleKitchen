const Item = require('../models/itemModel');

/*
CREATE TABLE Item (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    img_url VARCHAR(1000),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);
 */

// define a function to retrieve all the items' information
exports.getAllItems = async (req, res) => {
    try {
        const allItems = await Item.findAll();
        res.send({
            status: "ok",
            data: allItems
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve an item's information by name
exports.getItemByName = async (req, res) => {
    try {
        const item = await Item.findOneByName(req.params.name);
        if (!item) {
            return res.status(404).send({
                status: "error",
                message: "Item not found."
            });
        }
        res.send({
            status: "ok",
            data: item
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve an item's information by id
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findOneById(req.params.id);
        if (!item) {
            return res.status(404).send({
                status: "error",
                message: "Item not found."
            });
        }
        res.send({
            status: "ok",
            data: item
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve items' information by category
exports.getItemsByCategory = async (req, res) => {
    try {
        const items = await Item.findByCategory(req.params.category);
        if (!items) {
            return res.status(404).send({
                status: "error",
                message: "Item not found."
            });
        }
        res.send({
            status: "ok",
            data: items
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve items' information by price range
exports.getItemsByPriceRange = async (req, res) => {
    try {
        const items = await Item.findByPriceRange(req.params.min, req.params.max);
        if (!items) {
            return res.status(404).send({
                status: "error",
                message: "Item not found."
            });
        }
        res.send({
            status: "ok",
            data: items
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to add an item
exports.addItem = async (req, res) => {
    const {
        name,
        description = null, // default to null if not provided
        price,
        img_url = null, // default to null if not provided
        category_id
    } = req.body;

    // verify that the required fields are present
    if (!name || !price || !category_id) {
        return res.status(403).send({
            status: "error",
            message: "Missing required fields."
        });
    }

    try {
        const newItem = await Item.addDish({
            name,
            description,
            price,
            img_url,
            category_id
        });
        res.send({
            status: "ok",
            data: newItem
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to update an item
exports.updateItem = async (req, res) => {
    const {name, description, price, img_url, category_id} = req.body;
    const item_id = +req.params.id;
    try {
        const updatedItem = await Item.updateDish({
            item_id,
            name,
            description,
            price,
            img_url,
            category_id
        });
        res.send({
            status: "ok",
            data: updatedItem
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to delete an item
exports.deleteItem = async (req, res) => {
    const item_id = +req.params.id;
    try {
        const deletedItem = await Item.deleteDish(item_id);
        res.send({
            status: "ok",
            data: deletedItem
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}