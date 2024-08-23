const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['profit_loss', 'balance_sheet', 'cash_flow', 'custom'],
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
