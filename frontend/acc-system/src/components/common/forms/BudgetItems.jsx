import React, { useState, useEffect } from 'react';
import { useBudget } from '../../../context/budgetContext';
import { useAccounts } from '../../../context/accountContext';

const AddBudgetForm = () => {
  const { addBudget } = useBudget();
  const { accounts, fetchAccounts } = useAccounts();
  
  useEffect(() => {
    fetchAccounts();
  }, []);

  const [budgetName, setBudgetName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [categories, setCategories] = useState([
    { name: '', allocatedAmount: 0, spentAmount: 0 }
  ]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handle Account Change
  const handleAccountChange = (e) => {
    const accountId = e.target.value;
    setSelectedAccount(accountId);

    const selectedAccount = accounts.find(account => account._id === accountId);
    const accountBalance = selectedAccount ? selectedAccount.balance : 0;

    setTotalAmount(accountBalance);
    console.log(`Selected Account Balance: ${accountBalance}`);
  };

  // Handle Category Change
  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = categories.map((category, idx) => 
      idx === index ? { ...category, [field]: value } : category
    );
    setCategories(updatedCategories);
    console.log(`Category Updated (index: ${index}, field: ${field}, value: ${value})`);
  };

  // Add New Category   
  const addCategory = () => {
    const newCategories = [...categories, { name: '', allocatedAmount: 0, spentAmount: 0 }];
    setCategories(newCategories);
  };

  // Remove Category
  const removeCategory = (index) => {   
    const remainingCategories = categories.filter((_, idx) => idx !== index);
    setCategories(remainingCategories);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const categoryData = categories.map((category) => ({
      name: category.name,
      allocatedAmount: category.allocatedAmount,
      spentAmount: category.spentAmount,
      progress: (category.spentAmount / category.allocatedAmount) * 100,
      alerts: {
        overspend: category.spentAmount > category.allocatedAmount,
        approachingLimit: (category.spentAmount / category.allocatedAmount) > 0.9
      }
    }));
    
    const budgetData = {
      name: budgetName,
      totalAmount: totalAmount,
      categories: categoryData,
      startDate,
      endDate,
    };

    console.log('Budget Data on Submit:', budgetData);
    addBudget(budgetData);

    // Reset Form
    setBudgetName('');
    setTotalAmount(0);
    setCategories([{ name: '', allocatedAmount: 0, spentAmount: 0 }]);
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-budget-form">
      <div>
        <label>Budget Name</label>
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="account">Account:</label>
        <select
          id="account"
          name="account"
          value={selectedAccount}
          onChange={handleAccountChange}
          required
        >
          <option value="">Select an Account</option>
          {accounts.map((account) => (
            <option key={account._id} value={account._id}>
              {account.name} - {account.type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Total Amount</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          required
          readOnly // Make it read-only since it's set based on account selection
        />
      </div>

      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <div className="categories-section">
        <h4>Categories</h4>
        {categories.map((category, index) => (
          <div key={index} className="category">
            <label>Category {index + 1}</label>

            <input 
              type="text" 
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
              required
            />

            <label htmlFor="allocatedAmount">Allocated Amount</label>
            <input
              type="number"
              placeholder="Allocated Amount"
              value={category.allocatedAmount}
              onChange={(e) => handleCategoryChange(index, 'allocatedAmount', Number(e.target.value))}
              required
            />

            <label htmlFor="spentAmount">Spent Amount</label>
            <input
              type="number"
              placeholder="Spent Amount"
              value={category.spentAmount}
              onChange={(e) => handleCategoryChange(index, 'spentAmount', Number(e.target.value))}
            />  

            {categories.length > 1 && (
              <button type="button" onClick={() => removeCategory(index)}>Remove Category</button>
            )}
          </div>
        ))}

        <button type="button" onClick={addCategory}>Add Another Category</button>
      </div>

      <button type="submit">Submit Budget</button>
    </form>
  );
};

export default AddBudgetForm;
