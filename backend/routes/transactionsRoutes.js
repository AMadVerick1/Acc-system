const express = require('express');
const { createTransaction, getTransactions, updateTransaction } = require('../controllers/transactionController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);

module.exports = router;
