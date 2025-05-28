import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  status: { type: String, enum: ['available', 'sold_out'], default: 'available' },
  category: { type: String, required: true },
  unit: { type: String, required: true, enum: ['kg', 'ton', 'piece', 'box'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Product', productSchema); 