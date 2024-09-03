const express = require('express');
const { generateReport, getReports } = require('../controllers/reportController');
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/generate', generateReport);
router.get('/metrics', getReports);

module.exports = router;
