const express = require('express');
const { createTransaction, getTransactions, updateTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTransaction);
router.get('/', protect, getTransactions);
router.put('/:id', protect, updateTransaction);

module.exports = router;
