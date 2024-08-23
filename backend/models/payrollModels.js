const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    netPay: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payroll', payrollSchema);
