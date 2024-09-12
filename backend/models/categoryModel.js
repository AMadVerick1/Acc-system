const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  }, // Category name (e.g., "Groceries", "Rent")
  allocatedAmount: { 
    type: Number, 
    required: true 
  }, // Amount allocated for this category
  spentAmount: { 
    type: Number, 
    default: 0 
  }, // Amount spent in this category
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget'
  }, // Reference to the budget
  progress: {
    type: Number, 
    default: 0 
  }, // Percentage of budget used
  alerts: {
    overspend: { 
      type: Boolean, 
      default: false 
    },
    approachingLimit: { 
      type: Boolean, 
      default: false 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Category', categorySchema);
