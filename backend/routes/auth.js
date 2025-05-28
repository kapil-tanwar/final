import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Farmer from '../models/Farmer.js';
import Company from '../models/Company.js';

const router = express.Router();

// Helper to generate JWT
function generateToken(user, type) {
  return jwt.sign(
    { id: user._id, email: user.email, type },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Farmer Registration
router.post('/register/farmer', async (req, res) => {
  try {
    const { name, username, email, phone, password, address } = req.body;
    const existing = await Farmer.findOne({ $or: [ { email }, { username }, { phone } ] });
    if (existing) return res.status(400).json({ message: 'Email, username, or phone already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const farmer = await Farmer.create({ name, username, email, phone, password: hashed, address });
    const token = generateToken(farmer, 'farmer');
    res.json({ token, user: { id: farmer._id, name: farmer.name, username: farmer.username, email: farmer.email, phone: farmer.phone, address: farmer.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Farmer Login (by email, username, or phone)
router.post('/login/farmer', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email, username, or phone
    const farmer = await Farmer.findOne({ $or: [ { email: identifier }, { username: identifier }, { phone: identifier } ] });
    if (!farmer) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, farmer.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(farmer, 'farmer');
    res.json({ token, user: { id: farmer._id, name: farmer.name, username: farmer.username, email: farmer.email, phone: farmer.phone, address: farmer.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Company Registration
router.post('/register/company', async (req, res) => {
  try {
    const { name, username, email, phone, password, address } = req.body;
    const existing = await Company.findOne({ $or: [ { email }, { username }, { phone } ] });
    if (existing) return res.status(400).json({ message: 'Email, username, or phone already in use' });
    const hashed = await bcrypt.hash(password, 10);
    const company = await Company.create({ name, username, email, phone, password: hashed, address, products: [], orders: [] });
    const token = generateToken(company, 'company');
    res.json({ token, user: { id: company._id, name: company.name, username: company.username, email: company.email, phone: company.phone, address: company.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Company Login (by email, username, or phone)
router.post('/login/company', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email, username, or phone
    const company = await Company.findOne({ $or: [ { email: identifier }, { username: identifier }, { phone: identifier } ] });
    if (!company) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, company.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(company, 'company');
    res.json({ token, user: { id: company._id, name: company.name, username: company.username, email: company.email, phone: company.phone, address: company.address } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout route - can be used by both farmers and companies
router.post('/logout', async (req, res) => {
  try {
    // Since we're using JWT tokens, we don't need to do anything on the server side
    // The client will handle removing the token from localStorage
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
});

router.get('/check', (req, res) => { res.send('Auth routes are working.'); });

export default router; 