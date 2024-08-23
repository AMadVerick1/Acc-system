const Transaction = require('../models/transactionsModels');

const getAllTransactions = async (userId) => {
  return await Transaction.find({ user: userId });
};

const createTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

const updateTransaction = async (id, updatedData) => {
  return await Transaction.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTransaction = async (id) => {
  return await Transaction.findByIdAndDelete(id);
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
