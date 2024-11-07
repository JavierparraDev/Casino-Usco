export const validateUser = (req, res, next) => {
    const { nombre, apellidos, telefono, numeroIdentificacion, fechaNacimiento, email, password, direccion } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!nombre || !apellidos || !telefono || !numeroIdentificacion || !fechaNacimiento || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    // Validación de `nombre` y `apellidos`
    if (typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.trim().length > 50) {
        return res.status(400).json({ error: 'El nombre debe ser un texto entre 2 y 50 caracteres.' });
    }
    if (typeof apellidos !== 'string' || apellidos.trim().length < 2 || apellidos.trim().length > 50) {
        return res.status(400).json({ error: 'Los apellidos deben ser un texto entre 2 y 50 caracteres.' });
    }

    // Validación de `telefono`
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        return res.status(400).json({ error: 'El teléfono debe contener exactamente 10 dígitos numéricos.' });
    }

    // Validación de `numeroIdentificacion`
    if (typeof numeroIdentificacion !== 'string' || numeroIdentificacion.trim().length < 6 || numeroIdentificacion.trim().length > 20) {
        return res.status(400).json({ error: 'El número de identificación debe tener entre 6 y 20 caracteres.' });
    }

    // Validación de `fechaNacimiento`
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime()) || nacimiento >= new Date()) {
        return res.status(400).json({ error: 'La fecha de nacimiento es inválida o está en el futuro.' });
    }

    // Validación de `email`
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido.' });
    }

    // Validación de `password`
    if (typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    // Validación de `ciudad`
    if (typeof ciudad !== 'string' || ciudad.trim().length < 2) {
        return res.status(400).json({ error: 'La ciudad debe ser un texto válido.' });
    }

    // Si todo está bien, pasar al siguiente middleware o controlador
    next();
};
