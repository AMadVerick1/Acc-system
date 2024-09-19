const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  account: { type: String, required: true }, 
  date: { type: Date, default: Date.now }, 
  description: { type: String, required: true },
  source: { type: String, required: true }, 
  amount: { type: Number, required: true }, 
  type: { type: String, required: true }, 
  status: { type: String, default: 'pending' }, 
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceQuotation' }, 
}, { timestamps: true }); 

module.exports = mongoose.model('Transaction', transactionSchema);