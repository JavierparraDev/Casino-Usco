import express from 'express';
import { getTeams } from '../controllers/footballController.js';

const router = express.Router();

router.get('/teams', getTeams);

export default router;
