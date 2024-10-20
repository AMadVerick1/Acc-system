import React, { createContext, useState, useContext } from 'react';
import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from '../services/transactionServices';

const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            setError('Failed to fetch transactions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getTransactionByID = async (id) => {
        try {
            const transaction = await getTransactionById(id);
            return transaction;
        } catch (error) {
            console.error('Failed to fetch transaction:', error);
            setError('Failed to fetch transaction. Please try again.');
        }
    };

    const addTransaction = async (transactionData) => {
      try {
          const newTransaction = await createTransaction(transactionData);
          setTransactions((prev) => [...prev, newTransaction]);
      } catch (error) {
          console.error('Failed to add transaction:', error);
          setError('Failed to add transaction. Please try again.');
      }
    };

    const editTransaction = async (id, transactionData) => {
        try {
            console.log("Updating transaction with data:", transactionData);  // Debug log
            const updatedTransaction = await updateTransaction(id, transactionData);
            setTransactions((prev) =>
                prev.map((transaction) => (transaction._id === id ? updatedTransaction : transaction))
            );
        } catch (error) {
            console.error('Failed to update transaction:', error);
            setError('Failed to update transaction. Please try again.');
        }
    };



    const removeTransaction = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions((prev) => prev.filter((transaction) => transaction._id !== id));
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            setError('Failed to delete transaction. Please try again.');
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, fetchAllTransactions, getTransactionByID, addTransaction, editTransaction, removeTransaction, loading, error }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);
