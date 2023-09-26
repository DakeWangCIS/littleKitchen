const dbPool = require('../config/databasePool');

class ItemModel {
    // query the database for a dish with the given name
    static async findOneByName(name) {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM item WHERE name = ?', [name]);
            if (rows.length === 0) return null;
            return rows[0];
        } catch (e) {
            e.message = `Error in method findOneByName(): ${e.message}`;
            throw e;
        }
    }

    // query the database for a dish with the given id
    static async findOneById(id) {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM item WHERE item_id = ?', [id]);
            if (rows.length === 0) return null;
            return rows[0];
        } catch (e) {
            e.message = `Error in method findOneById(): ${e.message}`;
            throw e;
        }
    }

    // query the database for all dishes
    static async findAll() {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM item');
            return rows;
        } catch (e) {
            e.message = `Error in method findAll(): ${e.message}`;
            throw e;
        }
    }

    // query the database for dishes with the given category
    static async findByCategory(category) {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM item WHERE category_id = ?', [category]);
            if (rows.length === 0) return null;
            return rows;
        } catch (e) {
            e.message = `Error in method findOneByCategory(): ${e.message}`;
            throw e;
        }
    }

    // query the database for dishes with the given price range
    static async findByPriceRange(min, max) {
        try {
            const [rows] = await dbPool.execute('SELECT * FROM item WHERE price BETWEEN ? AND ?', [min, max]);
            if (rows.length === 0) return null;
            return rows;
        } catch (e) {
            e.message = `Error in method findOneByPriceRange(): ${e.message}`;
            throw e;
        }
    }

    // foreign key constraint
    static async isValidCategory(category_id) {
        try {
            const [rows] = await dbPool.execute('SELECT category_id FROM category WHERE category_id = ?', [category_id]);
            return rows.length > 0;
        } catch (e) {
            e.message = `Error in method isValidCategory(): ${e.message}`;
            throw e;
        }
    }

    // add a new dish to the database
    static async addDish(data) {
        try {
            const isValid = await this.isValidCategory(data.category_id);
            if (!isValid) {
                throw new Error('Invalid category');
            }
            const result = await dbPool.execute('INSERT INTO item (name, description, price, img_url, category_id) VALUES (?, ?, ?, ?, ?)', [
                data.name,
                data.description,
                data.price,
                data.img_url,
                data.category_id
            ]);
            return result.insertId;
        } catch (e) {
            e.message = `Error in method addDish(): ${e.message}`;
            throw e;
        }
    }

    // update a dish in the database
    static async updateDish(id, name, description, price, img_url, category_id) {
        try {
            const [result] = await dbPool.execute('UPDATE item SET name = ?, description = ?, price = ?, img_url = ?, category_id = ? WHERE item_id = ?', [
                name, description, price, img_url, category_id, id
            ]);
            return result.affectedRows !== 0;
        } catch (e) {
            e.message = `Error in method update(): ${e.message}`;
            throw e;
        }
    }

    // delete a dish from the database
    static async deleteDish(id) {
        try {
            const [result] = await dbPool.execute('DELETE FROM item WHERE item_id = ?', [id]);
            return result.affectedRows !== 0;
        } catch (e) {
            e.message = `Error in method delete(): ${e.message}`;
            throw e;
        }
    }
}

module.exports = ItemModel;