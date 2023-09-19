const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401).json({error: 'Unauthorized'});

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403).json({error: 'Forbidden'});
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
