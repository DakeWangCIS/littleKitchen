const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/databasePool.js');
const jwtConfig = require('../config/jwtConfig.js');

exports.login = async (req, res) => {
    const { identifier: username, password } = req.body;
    const sql = 'SELECT * FROM user WHERE username = ? LIMIT 1';
    try {
        const [results] = await pool.execute(sql, [username]);

        if (results.length === 0) {
            return res.status(404).send({
                status: "error",
                message: "User not found.",
                auth: false,
                token: null
            });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(403).send({
                status: "error",
                message: "Invalid username or password.",
                auth: false,
                token: null
            });
        }

        // Update the last_login_date to current timestamp
        const updateLoginDateSQL = 'UPDATE user SET last_login_date = CURRENT_TIMESTAMP WHERE user_id = ?';
        await pool.execute(updateLoginDateSQL, [user.user_id]);

        const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            status: "ok",
            data: {user_id: user.user_id, username: user.username, is_admin: user.is_admin},
            auth: true,
            token: token
        });
    } catch (err) {
        console.error('Error occurred during query:', err);
        res.status(500).send({
            status: "error",
            message: "Error occurred during query.",
            auth: false,
            token: null
        });
    }
};


