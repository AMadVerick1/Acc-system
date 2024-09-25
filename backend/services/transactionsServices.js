const Transactions = require('../models/transactionsModels');

// Fetch all transactions
const getAllTransactions = async () => {
  try {
    return await Transactions.find();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
};

// Fetch a transaction by ID
const getTransactionById = async (id) => {
  try {
    const transaction = await Transactions.findById(id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  } catch (error) {
    if (error.kind === 'ObjectId') {
      throw new Error('Invalid transaction ID');
    }
    console.error('Error fetching transaction by ID:', error);
    throw new Error('Error fetching transaction');
  }
};

// Create a new transaction
const createTransaction = async (transactionData) => {
  try {
    const transaction = new Transactions(transactionData);
    return await transaction.save();
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Failed to create transaction');
  }
};

// Update a transaction by ID
const updateTransaction = async (id, updatedData) => {
  try {
    if (!updatedData || typeof updatedData !== 'object') {
      throw new Error('No valid update data provided');
    }

    console.log('Updating transaction in database with data:', updatedData);  // Debug log

    const transaction = await Transactions.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true, // Ensures validation
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  } catch (error) {
    if (error.kind === 'ObjectId') {
      throw new Error('Invalid transaction ID');
    }
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

// Delete a transaction by ID
const deleteTransaction = async (id) => {
  try {
    const transaction = await Transactions.findByIdAndDelete(id);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  } catch (error) {
    if (error.kind === 'ObjectId') {
      throw new Error('Invalid transaction ID');
    }
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
