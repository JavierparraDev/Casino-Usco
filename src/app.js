import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';
import footballRoutes from './routes/footballRoutes.js';

dotenv.config();

const app  = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5173', // O 'http://localhost:5173' dependiendo de cómo estés corriendo tu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Cambia este puerto si tu frontend corre en otro
    credentials: true,
}));


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/football', footballRoutes);


export default app;