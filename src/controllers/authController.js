import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// Genera un token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
// Token que expira en 1 hora
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// Token que expira en 30 minutos
// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30m' });
// };


// Controlador de registro
export const register = async (req, res) => {
    try {
        const { nombre, apellidos, telefono, numeroIdentificacion, fechaNacimiento, email, password, direccion } = req.body;

        // Verifica que no exista otro usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario con los datos del formulario
        const user = new User({ nombre, apellidos, telefono, numeroIdentificacion, fechaNacimiento, email, password, direccion });
        await user.save();

        // Crear un token JWT para autenticar al usuario
        const token = generateToken(user._id);

        // Enviar el token como cookie para que pueda ser usado en futuras solicitudes
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400000 });
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el usuario', details: error.message });
    }
};


// Controlador de login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400000 });
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el inicio de sesión', details: error.message });
    }
};
