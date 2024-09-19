const express = require('express');
const { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');

const router = express.Router();

router.post('/create-transaction', createTransaction);
router.get('/get-transactions', getTransactions);
router.get('/get-transaction/:id', getTransaction);
router.put('/update-transaction/:id', updateTransaction); // Pass ID via params
router.delete('/delete-transaction/:id', deleteTransaction);

module.exports = router;
