const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId }, 
  name: { type: String, required: true },
  allocatedAmount: { type: Number, default: 0, required: true },
  spentAmount: { type: Number, default: 0, required: true },
  progress: { type: Number, default: 0 },
  alerts: {
    overspend: { type: Boolean, default: false },
    approachingLimit: { type: Boolean, default: false },
  }
});

const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalAmount: { type: Number, default: 0, required: true },
  categories: [categorySchema], 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', budgetSchema);