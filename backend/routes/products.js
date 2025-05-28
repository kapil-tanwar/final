import express from 'express';
import Farmer from '../models/Farmer.js';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(decoded.id);
    
    if (!farmer) throw new Error();
    
    req.token = token;
    req.farmer = farmer;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

// Add a new product
router.post('/add', auth, async (req, res) => {
  try {
    const { name, description, price, quantity, category, unit } = req.body;
    
    // 1. Create and save the product in the global products collection
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      unit,
      farmer: req.farmer._id  // Link to the farmer who created it
    });

    // Save the product to the global products collection
    const savedProduct = await product.save();
    console.log('Product saved to global collection:', savedProduct._id);

    // 2. Add the product reference to the farmer's products array
    if (!req.farmer.products) {
      req.farmer.products = [];
    }
    
    // Check if product is already in farmer's products array
    const productExists = req.farmer.products.some(p => p.toString() === savedProduct._id.toString());
    if (!productExists) {
      req.farmer.products.push(savedProduct._id);
      await req.farmer.save();
      console.log('Product reference added to farmer:', req.farmer._id);
    }

    // 3. Return the complete product data
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate('farmer', 'name email phone address');

    res.status(201).json({ 
      message: 'Product added successfully',
      product: populatedProduct 
    });

  } catch (error) {
    console.error('Error adding product:', error);
    
    // If product was saved but farmer update failed, try to clean up
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Invalid product data', 
        details: error.message 
      });
    }
    
    res.status(500).json({ 
      message: 'Error adding product to database',
      error: error.message 
    });
  }
});

// Get all products for a farmer
router.get('/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.farmer._id });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.patch('/update/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'price', 'quantity', 'category', 'unit', 'status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  try {
    const product = await Product.findOne({ _id: req.params.id, farmer: req.farmer._id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    updates.forEach(update => product[update] = req.body[update]);
    await product.save();
    
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.farmer._id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove product reference from farmer's products
    req.farmer.products = req.farmer.products.filter(p => p.toString() !== req.params.id);
    await req.farmer.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all available products (for companies to view)
router.get('/available', async (req, res) => {
  try {
    const products = await Product.find({ status: 'available' })
      .populate('farmer', 'name email phone address')
      .sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 