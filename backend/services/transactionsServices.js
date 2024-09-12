const Transaction = require('../models/transactionsModels');

const getAllTransactions = async () => {
  return await Transaction.find({});
};

const createTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

const updateTransaction = async (id, updatedData) => {
  const transaction = await Transaction.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true, // Ensures data consistency
  });

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transaction;
};

const deleteTransaction = async (id) => {
  const transaction = await Transaction.findByIdAndDelete(id);

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transaction;
};

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
