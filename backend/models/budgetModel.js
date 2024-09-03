const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a budget name'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Please add the total budget amount'],
    },
    allocatedAmount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please specify a budget category'],
      enum: ['Housing', 'Transportation', 'Food', 'Utilities', 'Entertainment', 'Savings', 'Other'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date for the budget'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please add an end date for the budget'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
