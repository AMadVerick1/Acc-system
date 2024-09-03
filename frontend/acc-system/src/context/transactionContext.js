import React, { createContext, useState, useContext } from 'react';
import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from '../services/transactionServices';

const TransactionContext = createContext();


export const TransactionContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      setTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const editTransaction = async (id, updateData) => {
    try {
      const updatedTransaction = await updateTransaction(id, updateData);
      setTransactions((prev) =>
        prev.map((transaction) => (transaction.id === id ? updatedTransaction : transaction))
      );
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const removeTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, fetchAllTransactions, addTransaction, editTransaction, removeTransaction, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};
