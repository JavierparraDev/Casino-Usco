import axios from 'axios';

const FOOTBALL_API_URL = 'https://api-football-v1.p.rapidapi.com/v3/';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const getFootballData = async (endpoint) => {
    try {
        const response = await axios.get(`${FOOTBALL_API_URL}${endpoint}`, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching football data:', error);
        throw new Error('No se pudo obtener la información de fútbol.');
    }
};
