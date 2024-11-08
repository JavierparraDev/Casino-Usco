import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeagueData from '../components/LeagueData'; // Importamos el componente reutilizable

const Home = () => {
    const [selectedLeague, setSelectedLeague] = useState(null);
    const navigate = useNavigate();

    const handleNavigateToRegister = () => navigate('/register');
    const handleNavigateToLogin = () => navigate('/login');

    const handleLeagueSelect = (leagueId) => {
        setSelectedLeague(leagueId);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button onClick={handleNavigateToRegister} style={styles.button}>Registrar</button>
                <button onClick={handleNavigateToLogin} style={styles.button}>Iniciar Sesión</button>
            </header>
            <h1>Bienvenido a la Página Principal</h1>

            {/* Botones de selección de liga */}
            <div style={styles.leagueButtonsContainer}>
                <button onClick={() => handleLeagueSelect(39)} style={styles.button}>Premier League (Inglaterra)</button>
                <button onClick={() => handleLeagueSelect(140)} style={styles.button}>La Liga (España)</button>
                <button onClick={() => handleLeagueSelect(135)} style={styles.button}>Serie A (Italia)</button>
                <button onClick={() => handleLeagueSelect(71)} style={styles.button}>Brasileirao (Brasil)</button>
                <button onClick={() => handleLeagueSelect(78)} style={styles.button}>Bundesliga (Alemania)</button>
            </div>

            {/* Renderizar el componente LeagueData para la liga seleccionada */}
            {selectedLeague && <LeagueData leagueId={selectedLeague} />}
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '20px' },
    header: { display: 'flex', justifyContent: 'flex-end', padding: '10px' },
    button: { margin: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    leagueButtonsContainer: { marginTop: '20px' }
};

export default Home;
