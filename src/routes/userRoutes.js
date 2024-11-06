import express from 'express';

//import User from '../models/user.models.js';  ya no se utiliza
import { register, login } from '../controllers/authController.js';
import { validateUser } from '../middlewares/validateUser.js';
import { protect } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// Ruta de registro
router.post('/register', validateUser, register);

// Ruta de login
router.post('/login', login);

// Ruta para obtener el perfil del usuario
router.get('/profile', protect, (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
});

export default router;
