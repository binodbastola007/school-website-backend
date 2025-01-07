const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({
            msg: {
                message: 'No token provided.',
                level: 'Error'
            }
        });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                msg: {
                    message: 'Invalid or expired token.',
                    level: 'Error'
                }
            });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };
