const dbPool = require('../config/databasePool');

class CategoryModel {
    // Add a new category to the database
    static async create(name) {
        try {
            const [result] = await dbPool.execute('INSERT INTO category (name) VALUES (?)', [name]);
            return result.insertId;
        } catch (e) {
            e.message = `Error in method create(): ${e.message}`;
            throw e;
        }
    }

    // Get all categories from the database
    static async findAll() {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM category');
            return rows;
        } catch (e) {
            e.message = `Error in method findAll(): ${e.message}`;
            throw e;
        }
    }

    // Get a category by its name
    static async findOneByName(name) {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM category WHERE name = ?', [name]);
            return rows[0];
        } catch (e) {
            e.message = `Error in method findById(): ${e.message}`;
            throw e;
        }
    }

    // Delete a category from the database
    static async delete(id) {
        try {
            const [result] = await dbPool.execute('DELETE FROM category WHERE category_id = ?', [id]);
            return result.affectedRows !== 0;
        } catch (e) {
            e.message = `Error in method delete(): ${e.message}`;
            throw e;
        }
    }

    // Update a category in the database
    static async update(id, name) {
        try {
            const [result] = await dbPool.execute('UPDATE category SET name = ? WHERE category_id = ?', [
                name, id
            ]);
            return result.affectedRows !== 0;
        } catch (e) {
            e.message = `Error in method update(): ${e.message}`;
            throw e;
        }
    }
}

module.exports = CategoryModel;