// backend/src/routes/footballRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Endpoint para obtener equipos de la Premier League
router.get('/teams', async (req, res) => {
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/teams', {
            params: { league: '39', season: '2024' }, // Liga Premier League (ID: 39) y temporada actual
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Premier League teams:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

// Endpoint para obtener la tabla de clasificación de la Premier League
router.get('/standings', async (req, res) => {
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/standings', {
            params: { league: '39', season: '2023' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Premier League standings:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});
// Endpoint para obtener partidos de la Premier League
router.get('/matches', async (req, res) => {
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
            params: { league: '39', season: '2023' }, // Liga Premier League (ID: 39) y temporada actual
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Premier League matches:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

export default router;
