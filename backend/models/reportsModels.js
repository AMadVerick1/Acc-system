const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Profit_Loss', 'Balance_Sheet', 'Cash_Flow', 'Income_Statement', 'VAT'],
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    generatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
