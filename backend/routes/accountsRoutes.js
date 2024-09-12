const express = require('express');
const { createAccount, getAccounts, getAccount ,updateAccount, deleteAccount } = require('../controllers/accountController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/get-accounts',  getAccounts);
router.get('/get-account/:id',  getAccount);
router.post('/create-account',  createAccount);
router.put('/update-account/:id',  updateAccount);
router.delete('/delete-account/:id',  deleteAccount);

module.exports = router;
