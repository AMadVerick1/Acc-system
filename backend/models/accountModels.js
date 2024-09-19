const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'savings',
        required: true
    },
    category: {
        type: String,
        default: 'asset',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Account', accountSchema);
