import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';


import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app  = express()

app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

export default app;