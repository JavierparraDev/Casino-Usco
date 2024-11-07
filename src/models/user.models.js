import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    apellidos: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Valida que el teléfono tenga 10 dígitos.
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe tener 10 dígitos.`
        }
    },
    numeroIdentificacion: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 20,
        uppercase: true // Convierte el identificador a mayúsculas automáticamente.
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v < new Date(); // Valida que la fecha de nacimiento sea anterior a la fecha actual.
            },
            message: props => `La fecha de nacimiento ${props.value} no puede ser en el futuro.`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Convierte el correo a minúsculas.
        match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no es válido.']
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Exige al menos 8 caracteres para el password.
        select: false, // Evita que la contraseña se envíe en las consultas por defecto.
    },
    ciudad: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // Permite la generación de propiedades virtuales en el JSON.
    toObject: { virtuals: true }
});


// Middleware para hashear la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('User', userSchema);
