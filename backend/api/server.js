import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import serverless from 'serverless-http';

import { connectDB } from '../config/db.js';
import cartRouter from '../routes/cartRoute.js';
import foodRouter from '../routes/foodRoute.js';
import orderRouter from '../routes/orderRoute.js';
import userRouter from '../routes/userRoute.js';

dotenv.config();

let app;

if (!global._expressApp) {
  app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());

  // DB connection
  connectDB();

  // Routes
  app.use('/api/food', foodRouter);
  app.use('/images', express.static('uploads'));
  app.use('/api/user', userRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/order', orderRouter);

  app.get('/', (req, res) => {
    res.send('API Working');
  });

  global._expressApp = app;
} else {
  app = global._expressApp;
}

export const handler = serverless(app);
