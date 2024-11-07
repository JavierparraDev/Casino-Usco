import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [matches, setMatches] = useState([]);
    const [standings, setStandings] = useState([]);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFootballData = async () => {
            try {
                // Llamada para obtener los partidos
                const matchesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/football/matches`);
                setMatches(matchesResponse.data.response);

                // Llamada para obtener la tabla de clasificación
                const standingsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/football/standings`);
                setStandings(standingsResponse.data.response[0].league.standings[0]); // Asegúrate de obtener solo los standings de la liga

                // Llamada para obtener los equipos
                const teamsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/football/teams`);
                setTeams(teamsResponse.data.response);
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

            {/* Sección de Partidos */}
            <div style={styles.matchesContainer}>
                <h2>Calendario de Partidos de la Premier League</h2>
                {matches.length > 0 ? (
                    <ul>
                        {matches.map((match) => (
                            <li key={match.fixture.id}>
                                {match.teams.home.name} vs {match.teams.away.name} - {new Date(match.fixture.date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Cargando partidos...</p>
                )}
            </div>

            {/* Sección de Clasificación */}
            <div style={styles.standingsContainer}>
                <h2>Clasificación de la Premier League</h2>
                {standings.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Posición</th>
                                <th>Equipo</th>
                                <th>Puntos</th>
                                <th>Partidos Jugados</th>
                                <th>Goles a Favor</th>
                                <th>Goles en Contra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((team, index) => (
                                <tr key={team.team.id}>
                                    <td>{index + 1}</td>
                                    <td>{team.team.name}</td>
                                    <td>{team.points}</td>
                                    <td>{team.all.played}</td>
                                    <td>{team.all.goals.for}</td>
                                    <td>{team.all.goals.against}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Cargando clasificación...</p>
                )}
            </div>

            {/* Sección de Equipos */}
            <div style={styles.teamsContainer}>
                <h2>Equipos de la Premier League</h2>
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
    header: { display: 'flex', justifyContent: 'flex-end', padding: '10px' },
    button: { margin: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    matchesContainer: { marginTop: '20px' },
    standingsContainer: { marginTop: '20px' },
    teamsContainer: { marginTop: '20px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' },
    td: { border: '1px solid #ddd', padding: '8px' },
};

export default Home;
