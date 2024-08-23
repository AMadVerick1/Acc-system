const express = require('express');
const { generateReport, getDashboardMetrics } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/generate', protect, generateReport);
router.get('/metrics', protect, getDashboardMetrics);

module.exports = router;
