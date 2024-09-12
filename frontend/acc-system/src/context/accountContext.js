import React, { createContext, useState, useContext } from 'react';
import { getAllAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../services/accountService';

const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const data = await getAllAccounts(); // Use service function
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAccountById = async (id) => {
    try {
      const account = await getAccount(id); // Use service function
      return account;
    } catch (error) {
      console.error('Failed to fetch account:', error);
    }
  };

  const addAccount = async (account) => {
    try {
      const newAccount = await createAccount(account); // Use service function
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  const updateAccountById = async (id, updatedAccount) => {
    try {
      const existingAccount = accounts.find((account) => account._id === id);
      if (!existingAccount) {
        throw new Error('Account not found');
      }
      const updatedData = await updateAccount(id, updatedAccount); // Use service function
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) => (account._id === id ? updatedData : account))
      );
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const deleteAccountById = async (id) => {
    try {
      await deleteAccount(id); // Use service function
      setAccounts((prevAccounts) => prevAccounts.filter((account) => account._id !== id));
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, fetchAccounts, getAccountById, addAccount, updateAccountById, deleteAccountById, loading }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);
