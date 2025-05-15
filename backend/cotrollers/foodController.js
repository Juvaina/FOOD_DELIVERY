import fs from 'fs';
import foodModel from '../models/foodModel.js';

//add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

// Edit food item
const editFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // If new image is uploaded
    let updatedImage = food.image;
    if (req.file) {
      fs.unlink(`uploads/${food.image}`, () => {});
      updatedImage = req.file.filename;
    }

    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;
    food.image = updatedImage;

    await food.save();
    res.json({ success: true, message: 'Food Updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error' });
  }
};

export { addFood, editFood, listFood, removeFood };
