const express = require('express');
const { createTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const invoiceQuotationRoutes = require('./invoiceQuotationRoutes'); // Include invoice/quotation routes
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-transaction', createTransaction);
router.get('/get-transactions', getTransactions);
router.put('/update-transaction/:id', updateTransaction);
router.delete('/delete-transaction/:id', deleteTransaction);
router.use('/invoice-quotation', invoiceQuotationRoutes);

module.exports = router;
