import express from 'express';
import multer from 'multer';
import {
  addFood,
  editFood,
  listFood,
  removeFood
} from '../cotrollers/foodController.js';

const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);
foodRouter.post('/edit', upload.single('image'), editFood);

export default foodRouter;
