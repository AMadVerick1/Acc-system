const express = require('express');
const { processPayroll, getPayrollHistory } = require('../controllers/payrollController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, processPayroll);
router.get('/history', protect, getPayrollHistory);

module.exports = router;
