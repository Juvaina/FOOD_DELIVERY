import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
  } catch (error) {
    console.error('DB Connection Failed:', error.message);
    process.exit(1);
  }
};
