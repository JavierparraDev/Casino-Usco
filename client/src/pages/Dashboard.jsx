import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LeagueData from '../components/LeagueData';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [selectedLeague, setSelectedLeague] = useState(null);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLeagueSelect = (leagueId) => {
        setSelectedLeague(leagueId);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Bienvenido, {user.nombre}</h1>
                <button onClick={logout} style={styles.button}>Cerrar Sesión</button>
            </header>

            <h2>Selecciona una Liga</h2>
            <div style={styles.leagueButtonsContainer}>
                <button onClick={() => handleLeagueSelect(39)} style={styles.button}>Premier League (Inglaterra)</button>
                <button onClick={() => handleLeagueSelect(140)} style={styles.button}>La Liga (España)</button>
                <button onClick={() => handleLeagueSelect(135)} style={styles.button}>Serie A (Italia)</button>
                <button onClick={() => handleLeagueSelect(71)} style={styles.button}>Brasileirao (Brasil)</button>
                <button onClick={() => handleLeagueSelect(78)} style={styles.button}>Bundesliga (Alemania)</button>
            </div>

            {/* Mostrar LeagueData para la liga seleccionada */}
            {selectedLeague && <LeagueData leagueId={selectedLeague} />}
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' },
    button: { margin: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    leagueButtonsContainer: { marginTop: '20px' }
};

export default Dashboard;