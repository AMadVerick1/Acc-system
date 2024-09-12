const mongoose = require('mongoose');

const invoiceQuotationSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction', // Link to the Transaction
        required: true,
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    type: { type: String, default: 'Invoice', required: true }, // Define whether it's an invoice or quotation
    items: [
        {
            description: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String,  default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InvoiceQuotation', invoiceQuotationSchema);
