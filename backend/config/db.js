import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://juni160589:Junibavu1342@cluster0.sobwh.mongodb.net/food-del'
    )
    .then(() => console.log('DB Connected'));
};
