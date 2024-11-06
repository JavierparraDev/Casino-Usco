// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile, register as registerService, login as loginService } from '../services/authService'; // Importa los servicios de autenticación

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Comprobar si el usuario está autenticado cuando se monta el componente
        const fetchUser = async () => {
            try {
                const userProfile = await getUserProfile();
                setUser(userProfile);
            } catch (error) {
                console.error('No autenticado');
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const userData = await loginService(credentials);
            setUser(userData);
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw error; // Esto permitirá que el componente `Login` maneje el error
        }
    };

    const registerUser = async (data) => {
        try {
            const response = await registerService(data);
            const userData = response.data.user; // Asegúrate de recibir el usuario desde la respuesta del backend
            setUser(userData);
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error; // Para que el componente Register maneje el error
        }
    };

    const logout = () => {
        setUser(null);
        // Implementar lógica de cierre de sesión (borrar cookies, etc.)
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, registerUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
