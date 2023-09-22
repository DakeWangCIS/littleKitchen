const dbPool = require('../config/databasePool');

class CategoryModel {
    // Add a new category to the database
    static async create(name) {
        try {
            const [result] = await dbPool.execute('INSERT INTO category (name) VALUES (?)', [name]);
            return result.insertId;
        } catch (e) {
            throw e;
        }
    }

    // Get all categories from the database
    static async findAll() {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM category');
            return rows;
        } catch (e) {
            throw e;
        }
    }

    // Delete a category from the database
    static async delete(id) {
        try {
            const [result] = await dbPool.execute('DELETE FROM category WHERE category_id = ?', [id]);
            return result.affectedRows !== 0;
        } catch (e) {
            throw e;
        }
    }
}