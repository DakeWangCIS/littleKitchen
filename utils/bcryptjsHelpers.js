const bcryptjs = require('bcryptjs');

function hashPassword(password, callback) {
    const saltRounds = 10;
    bcryptjs.hash(password, saltRounds, callback);
}

function comparePassword(plainPassword, hash, callback) {
    bcryptjs.compare(plainPassword, hash, callback);
}

module.exports = {
    hashPassword,
    comparePassword
};
