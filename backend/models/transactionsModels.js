const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, default: 'Income', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  // Reference the Budget where the category belongs
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
  // Add category reference using its name or _id (if you decide to add _id in the Budget schema)
  category: { type: String, required: true }, // Can be replaced with category: { type: mongoose.Schema.Types.ObjectId } if you add _id to categories
  status: { type: String, default: 'Pending' },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
