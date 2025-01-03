const transactionService = require('../services/transactionsServices');

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await transactionService.createTransaction(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Request body is empty or undefined");
    }

    console.log("Received update request with data:", req.body);  // Debug log

    const updatedTransaction = await transactionService.updateTransaction(req.params.id, req.body);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Failed to update transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
};



const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(req.params.id);
    res.status(200).json(deletedTransaction); // Status code should be 200 or 204
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
