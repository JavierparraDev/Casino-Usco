import { getFootballData } from '../services/footballService.js';

export const getTeams = async (req, res) => {
    try {
        const data = await getFootballData('teams?league=39&season=2023'); // Liga inglesa, temporada 2023 por ejemplo
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de equipos' });
    }
};
