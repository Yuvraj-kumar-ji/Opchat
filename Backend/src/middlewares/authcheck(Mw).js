import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: 'Unauthorized, no token provided' });
        
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded || !decoded.userId) return res.status(401).json({ message: 'Unauthorized, invalid token' });
        
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'Unauthorized, user not found' });

        req.user = user;
        next();

    } catch (error) {
        console.error(`Error in protected route: ${error.message}`);
        return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};

