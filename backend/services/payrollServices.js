const Payroll = require('../models/payrollModels');

const getAllPayrolls = async (userId) => {
  return await Payroll.find({ user: userId });
};

const createPayroll = async (payrollData, userId) => {
  const { employeeName, salary, payDate } = payrollData;

  const newPayroll = new Payroll({
    user: userId,
    employeeName,
    salary,
    payDate,
  });

  return await newPayroll.save();
};

const updatePayroll = async (payrollId, updateData) => {
  const payroll = await Payroll.findByIdAndUpdate(payrollId, updateData, {
    new: true,
  });

  if (!payroll) {
    throw new Error('Payroll not found');
  }

  return payroll;
};

const deletePayroll = async (payrollId) => {
  const payroll = await Payroll.findByIdAndDelete(payrollId);

  if (!payroll) {
    throw new Error('Payroll not found');
  }

  return payroll;
};

module.exports = {
  getAllPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
};
