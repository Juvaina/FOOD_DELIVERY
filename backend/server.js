import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import cartRouter from './routes/cartRoute.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'https://food-delivery-bss9.vercel.app', // Frontend domain
    credentials: true // Optional, only if you're using cookies or auth headers
  })
);

// DB connection
connectDB();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
