import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFootballData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/football/teams');
                setTeams(response.data.response); // Acceder al arreglo de equipos
            } catch (error) {
                console.error('Error al obtener los datos de fútbol:', error);
            }
        };
        fetchFootballData();
    }, []);

    const handleNavigateToRegister = () => navigate('/register');
    const handleNavigateToLogin = () => navigate('/login');

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={handleNavigateToRegister} style={styles.button}>Registrar</button>
                <button onClick={handleNavigateToLogin} style={styles.button}>Iniciar Sesión</button>
            </header>
            <h1>Bienvenido a la Página Principal</h1>
            <canvas id="myCanvas" width="400" height="200" style={styles.canvas}></canvas>

            <div style={styles.teamsContainer}>
                <h2>Equipos de Fútbol</h2>
                {teams.length > 0 ? (
                    <ul>
                        {teams.map((team) => (
                            <li key={team.team.id}>{team.team.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Cargando equipos...</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '20px' },
    header: { display: 'flex', justifyContent: 'flex-end', padding: '10px', },
    canvas: { border: '1px solid black', marginTop: '20px' },
    button: { margin: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    teamsContainer: { marginTop: '20px' }
};
export default Home;
