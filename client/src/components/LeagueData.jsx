import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeagueData = ({ leagueId }) => {
    const [matches, setMatches] = useState([]);
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState({ matches: false, standings: false });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch matches
        const fetchMatches = async () => {
            setLoading((prev) => ({ ...prev, matches: true }));
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/football/matches/${leagueId}`);
                setMatches(response.data.response);
            } catch (error) {
                console.error('Error fetching matches:', error);
            } finally {
                setLoading((prev) => ({ ...prev, matches: false }));
            }
        };

        // Fetch standings
        const fetchStandings = async () => {
            setLoading((prev) => ({ ...prev, standings: true }));
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/football/standings/${leagueId}`);
                setStandings(response.data.response[0].league.standings[0]);
            } catch (error) {
                console.error('Error fetching standings:', error);
            } finally {
                setLoading((prev) => ({ ...prev, standings: false }));
            }
        };

        fetchMatches();
        fetchStandings();
    }, [leagueId]);

    const handleMatchClick = (matchId) => {
        // Verificar si el usuario está autenticado
        const isAuthenticated = false; // Cambia esta línea según tu lógica de autenticación
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            // Redirigir a los detalles del partido
            navigate(`/match/${matchId}`);
        }
    };

    return (
        <div>
            {/* Mostrar clasificación */}
            <h2>Clasificación</h2>
            {loading.standings ? (
                <p>Cargando clasificación...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Equipo</th>
                            <th>Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team, index) => (
                            <tr key={team.team.id}>
                                <td>{index + 1}</td>
                                <td>{team.team.name}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Mostrar partidos */}
            <h2>Próximos Partidos</h2>
            {loading.matches ? (
                <p>Cargando partidos...</p>
            ) : (
                <ul>
                    {matches.map((match) => (
                        <li key={match.fixture.id} onClick={() => handleMatchClick(match.fixture.id)}>
                            {match.teams.home.name} vs {match.teams.away.name} - {new Date(match.fixture.date).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LeagueData;
