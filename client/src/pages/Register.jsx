import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        telefono: '',
        numeroIdentificacion: '',
        fechaNacimiento: '',
        email: '',
        password: '',
        ciudad: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { registerUser } = useAuth(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reinicia el estado del error en cada intento

        // Validación básica del frontend
        if (!formData.nombre || !formData.apellidos || !formData.telefono || !formData.numeroIdentificacion || !formData.fechaNacimiento || !formData.email || !formData.password) {
            setError('Todos los campos son obligatorios');
            console.log('Error: Todos los campos son obligatorios');
            return;
        }

        try {
            await registerUser(formData); // Llama al contexto para registrar el usuario
            console.log("Usuario registrado exitosamente");
            navigate('/'); // Redirige a la página principal si el registro es exitoso
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Error en el registro. Por favor, inténtalo de nuevo.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input name="nombre" placeholder="Nombre" onChange={handleChange} required style={styles.input} />
                <input name="apellidos" placeholder="Apellidos" onChange={handleChange} required style={styles.input} />
                <input name="telefono" placeholder="Teléfono" onChange={handleChange} required style={styles.input} />
                <input name="numeroIdentificacion" placeholder="CC-NIT-CDN" onChange={handleChange} required style={styles.input} />
                <input name="fechaNacimiento" type="date" onChange={handleChange} required style={styles.input} />
                <input name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required style={styles.input} />
                <input name="ciudad" placeholder="Ciudad" onChange={handleChange} required style={styles.input} />
                <button type="submit" style={styles.button}>Registrar</button>
                <button onClick={() => navigate('/login')} style={styles.loginButton}> Iniciar Sesión</button>
                <button onClick={() => navigate('/')} style={styles.homeButton}>Ir a Home</button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
    </div>
        
    );
};

const styles = {
    container: { maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px' },
    input: { padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' },
    button: { padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    loginButton: { marginTop: '20px' ,padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    homeButton: { marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
    error: { color: 'red', marginTop: '10px' },
};

export default Register;
