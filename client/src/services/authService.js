// src/services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = (data) => {
    return axios.post(`${API_URL}/api/users/register`, data, { withCredentials: true });
};

export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error; // Deja que el error se maneje en el componente Login.jsx
    }
};

export const getUserProfile = () => {
    return axios.get(`${API_URL}/api/users/profile`, { withCredentials: true })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};
