import React, { createContext, useState, useContext } from 'react';
import { getBudgetOverview, addBudgetItem, updateBudgetItem, deleteBudgetItem } from '../services/budgetService';

const BudgetContext = createContext();

export const BudgetContextProvider = ({ children }) => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state

  const fetchBudgetOverview = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const data = await getBudgetOverview();
      console.log('Fetched data:', data); // Debugging log
      setBudgetItems(data);
    } catch (error) {
      console.error('Failed to fetch budget overview:', error);
      setError('Failed to fetch data'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (budgetData) => {
    try {
      const newItem = await addBudgetItem(budgetData);
      setBudgetItems((prev) => [...prev, newItem]);
    } catch (error) {
      console.error('Failed to add budget item:', error);
    }
  };

  const editBudgetItem = async (id, updateData) => {
    try {
      const updatedItem = await updateBudgetItem(id, updateData);
      setBudgetItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item)) // Use _id consistently
      );
    } catch (error) {
      console.error('Failed to update budget item:', error);
    }
  };

  const removeBudgetItem = async (id) => {
    try {
      await deleteBudgetItem(id);
      setBudgetItems((prev) => prev.filter((item) => item._id !== id)); // Use _id consistently
    } catch (error) {
      console.error('Failed to delete budget item:', error);
    }
  };

  return (
    <BudgetContext.Provider value={{ budgetItems, fetchBudgetOverview, addBudget, editBudgetItem, removeBudgetItem, loading, error }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
