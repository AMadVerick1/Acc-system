const payrollService = require('../services/payrollServices.js');

const getPayrolls = async (req, res) => {
  try {
    const payrolls = await payrollService.getAllPayrolls(req.user.id);
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPayroll = async (req, res) => {
  try {
    const payroll = await payrollService.createPayroll(req.body, req.user.id);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const updatedPayroll = await payrollService.updatePayroll(req.params.id, req.body);
    res.status(200).json(updatedPayroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePayroll = async (req, res) => {
  try {
    await payrollService.deletePayroll(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
};
