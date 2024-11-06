
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div>
            <h1>Bienvenido, {user.nombre}</h1>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
};

export default Home;
