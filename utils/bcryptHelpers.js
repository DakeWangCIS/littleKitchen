const bcrypt = require('bcrypt');

function hashPassword(password, callback) {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, callback);
}

function comparePassword(plainPassword, hash, callback) {
    bcrypt.compare(plainPassword, hash, callback);
}

module.exports = {
    hashPassword,
    comparePassword
};
