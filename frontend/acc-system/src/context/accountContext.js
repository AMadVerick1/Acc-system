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

    const updateAccountById = async (id, updatedAccount, transactionType) => {
      try {
        // Find the existing account by its ID
        const existingAccount = accounts.find((account) => account._id === id);
        if (!existingAccount) {
          throw new Error('Account not found');
        }
    
        // Ensure the amount is provided and is a valid number
        const amount = parseFloat(updatedAccount.amount);
        if (isNaN(amount)) {
          throw new Error('Invalid amount');
        }
    
        // Keep the current balance as the base
        let newBalance = existingAccount.balance;
    
        // Adjust balance based on transaction type (add for 'Income', subtract for 'Expense')
        newBalance += (transactionType === 'Income') ? amount : -amount;
    
        // Merge the existing account data with any updates, overriding only balance and amount
        const updatedData = {
          ...existingAccount, // Keep existing fields
          ...updatedAccount,  // Update only the fields passed in updatedAccount (e.g., if name changes)
          balance: newBalance, // Ensure the new balance is updated
        };
    
        // Send updated data to the updateAccount function and get the updated account from the server
        const updatedAccountFromServer = await updateAccount(id, updatedData);
    
        // Update the accounts state with the updated account data
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) => (account._id === id ? updatedAccountFromServer : account))
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
