import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth(); // metodo login
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);// Reinicia el estado de error en cada intento

        // Validación básica del frontend
        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            console.log('Error: Todos los campos son obligatorios');
            return;
        }

        try {
            await login({ email, password }); // Intenta iniciar sesión con el contexto
            console.log('Inicio de sesión exitoso');
            navigate('/dashboard'); // Redirige a la página principal si tiene éxito
        } catch (error) {
            // Manejo del error en caso de fallo en el backend
            if (error.response && error.response.status === 401) {
                setError('Credenciales incorrectas'); // Error si la autenticación falla en el backend
                console.log('Error: Credenciales incorrectas');
            } else {
                setError('Error de conexión con el servidor');
                console.log('Error de conexión con el servidor:', error);
            }
        }   
    };

    const handleNavigateToHome = () => {
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Iniciar Sesión</button>
                {error && <p style={styles.error}>{error}</p>}
                
                <button onClick={handleNavigateToHome} style={styles.homeButton}>Ir a Home</button>
            </form>
            
    </div>   
    );
};

const styles = {
    form: { maxWidth: '300px', margin: '0 auto', display: 'flex', flexDirection: 'column' },
    input: { marginBottom: '10px', padding: '10px', fontSize: '16px' },
    button: { padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none' },
    homeButton: { marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
    error: { color: 'red', marginTop: '10px' },
};

export default Login;
