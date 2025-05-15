import userModel from '../models/userModel.js';

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    let cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (!itemId) {
      return res.json({ success: false, message: 'Item ID is required' });
    }

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { $set: { cartData } });

    res.json({ success: true, message: 'Added To Cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding to cart' });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    let cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (!itemId) {
      return res.json({ success: false, message: 'Item ID is required' });
    }

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    // Optionally remove item if quantity reaches 0
    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: 'Removed from cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error removing from cart' });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching cart' });
  }
};

export { addToCart, getCart, removeFromCart };
