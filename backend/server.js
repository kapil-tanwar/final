import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 