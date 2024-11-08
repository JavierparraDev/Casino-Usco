import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: 'No autorizado, token faltante' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ error: 'No autorizado, usuario no encontrado' });
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
