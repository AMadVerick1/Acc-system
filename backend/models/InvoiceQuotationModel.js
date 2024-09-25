const mongoose = require('mongoose');

// Invoice/Quotation Schema
const invoiceQuotationSchema = new mongoose.Schema({
    transactionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
      }
    ],
    customerName: { type: String, required: true },
    customerEmail: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] 
    },
    type: { 
        type: String, 
        default: 'Invoice' 
    },
    items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('InvoiceQuotation', invoiceQuotationSchema);
