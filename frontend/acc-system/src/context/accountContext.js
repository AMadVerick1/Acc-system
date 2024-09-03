import React, { createContext, useState, useContext } from 'react';
import { getAllAccounts, createAccount } from '../services/accountService';

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

  const addAccount = async (account) => {
    try {
      const newAccount = await createAccount(account); // Use service function
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  return (
    <AccountContext.Provider value={{ accounts, fetchAccounts, addAccount, loading }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);
