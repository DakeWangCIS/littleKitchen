const dbPool = require('../config/databasePool');

class UserModel {

    // query the database for a user with the given username
    static async findOneByUsername(username) {
        const [rows] = await dbPool.execute('SELECT * FROM user WHERE username = ?', [username]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // query the database for a user with the given id
    static async findById(id) {
        const [rows] = await dbPool.execute('SELECT * FROM user WHERE user_id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    // query the database for all users
    static async findAll() {
        const [rows] = await dbPool.execute('SELECT * FROM user');
        return rows;
    }

    // create a new user in the database
    static async create(data) {
        const connection = await dbPool.getConnection();
        try{
            const [result] = await connection.execute('INSERT INTO user (username, password, email, address, phone_number, create_date, last_login_date, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                data.username,
                data.password,
                data.email,
                data.address,
                data.phone_number || null,
                data.createDate || null,
                data.lastLoginDate || null,
                data.is_admin || false
            ]);
            await connection.commit();
            return result.insertId;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    // update a user in the database
    static async update(id, username, address, phone) {
        const [result] = await dbPool.execute('UPDATE user SET username = ?, address = ?, phone_number = ? WHERE user_id = ?', [username, address, phone, id]);
        return result.affectedRows !== 0;
    }

    // delete a user from the database
    static async delete(id) {
        const [result] = await dbPool.execute('DELETE FROM user WHERE user_id = ?', [id]);
        return result.affectedRows !== 0;
    }

    // check if an email already exists in the database
    static async emailExists(email) {
        const [rows] = await dbPool.execute('SELECT email FROM user WHERE email = ?', [email]);
        return rows.length > 0;
    }
}

module.exports = UserModel;

