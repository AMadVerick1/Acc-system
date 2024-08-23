const transactionService = require('../services/transactionsServices');

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions(req.user.id);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransaction({ ...req.body, user: req.user.id });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionService.updateTransaction({ ...req.body, user: req.user.id });
    res.status(201).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller methods...

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction
}