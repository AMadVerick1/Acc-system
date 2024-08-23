const express = require('express');
const { createAccount, getAccounts, updateAccount } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createAccount);
router.get('/', protect, getAccounts);
router.put('/:id', protect, updateAccount);

module.exports = router;
