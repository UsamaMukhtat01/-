// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to req.user
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// module.exports = verifyToken;
