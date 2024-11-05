import {router} from 'express';
//import User from '../models/user.models.js';  ya no se utiliza
import { register, login } from '../controllers/authController.js';
import { validateUser } from '../middlewares/validateUser.js';

const router = Router(); 

// Ruta de registro
router.post('/register', validateUser, register);

// Ruta de login
router.post('/login', login);

export default router;
