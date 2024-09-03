const express = require('express');
const { createAccount, getAccounts, updateAccount } = require('../controllers/accountController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',  createAccount);
router.get('/',  getAccounts);
router.put('/:id',  updateAccount);

module.exports = router;
