const express = require('express');
const {getPayrolls, createPayroll, updatePayroll, deletePayroll } = require('../controllers/payrollController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',  getPayrolls);
router.post('/',  createPayroll);
router.post('/',  updatePayroll);
router.delete('/history',  deletePayroll);

module.exports = router;
