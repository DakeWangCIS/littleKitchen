const Category = require('../models/categoryModel');

/*
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
 */

// define a function to retrieve all the categories' information
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();
        res.send({
            status: "ok",
            data: allCategories
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve a category's information by name
exports.getCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOneByName(req.params.name);
        if (!category) {
            return res.status(404).send({
                status: "error",
                message: "Category not found."
            });
        }
        res.send({
            status: "ok",
            data: category
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to retrieve a category's information by id
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOneById(req.params.id);
        if (!category) {
            return res.status(404).send({
                status: "error",
                message: "Category not found."
            });
        }
        res.send({
            status: "ok",
            data: category
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to add a new category
exports.addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body.name);
        res.status(201).send({
            status: "ok",
            data: newCategory
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const result = await Category.delete(req.params.id);
        if (!result) {
            return res.status(404).send({
                status: "error",
                message: "Category not found."
            });
        }
        res.send({
            status: "ok",
            data: result
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}

// define a function to update a category
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    const { id } = +req.params;
    try {
        const result = await Category.update(id, name);
        if (!result) {
            return res.status(404).send({
                status: "error",
                message: "Category not found."
            });
        }
        res.send({
            status: "ok",
            data: result
        });
    } catch (e) {
        console.error('Error occurred during query:', e);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query."
        });
    }
}