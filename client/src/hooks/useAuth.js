// hooks/useAuth.js
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Si no hay usuario, redirigir a login
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const logout = () => {
        // Limpia el token y redirige a la página de inicio
        document.cookie = 'token=; Max-Age=0';
        setUser(null);
        navigate('/login');
    };

    return { user, logout };
};

export default useAuth;
