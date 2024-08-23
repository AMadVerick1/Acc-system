const reportService = require('../services/reportService');

const generateReport = async (req, res) => {
  try {
    const report = await reportService.generate(req.user.id, req.query);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await reportService.getReports(req.user.id);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateReport,
  getReports,
};
