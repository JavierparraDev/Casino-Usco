import app  from './app.js'
import connectDB from '../src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();



app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu API con Node.js y MongoDB!');
  });

 
  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });