
import express from 'express';
import axios from 'axios';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint para obtener los partidos de una liga específica
router.get('/matches/:league', protect, async (req, res) => {
    const league = req.params.league;
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
            params: { league, season: '2024' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching matches for league ${league}:`, error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

// Endpoint para obtener la tabla de clasificación de una liga específica
router.get('/standings/:league', protect, async (req, res) => {
    const league = req.params.league;
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/standings', {
            params: { league, season: '2024' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching standings for league ${league}:`, error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

export default router;
