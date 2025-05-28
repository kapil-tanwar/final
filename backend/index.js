import express from 'express';
import connectDB from './DB/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';


dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('AgroVerse Backend Running');
});

app.get('/check', (req, res) => { res.send('Express server (index) is working.'); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
}); 