import React, { useState } from 'react';
import { useBudget } from '../../../context/budgetContext';

const AddBudgetForm = () => {
  const { addBudget } = useBudget();
  
  // Form States
  const [budgetName, setBudgetName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [categories, setCategories] = useState([
    { name: '', allocatedAmount: 0, spentAmount: 0 }
  ]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Log Form State Changes
  const logStateChange = (field, value) => {
    console.log(`Field: ${field}, Value: ${value}`);
  };

  // Handle Category Change
  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = categories.map((category, idx) => 
      idx === index ? { ...category, [field]: value } : category
    );
    setCategories(updatedCategories);
    
    // Log updated categories
    console.log(`Category Updated (index: ${index}, field: ${field}, value: ${value})`);
    console.log('Updated Categories:', updatedCategories);
  };

  // Add New Category   
  const addCategory = () => {
    const newCategories = [...categories, { name: '', allocatedAmount: 0, spentAmount: 0 }];
    setCategories(newCategories);

    // Log categories after addition
    console.log('Categories After Addition:', newCategories);
  };

  // Remove Category
  const removeCategory = (index) => {   
    const remainingCategories = categories.filter((_, idx) => idx !== index);
    setCategories(remainingCategories);

    // Log categories after removal
    console.log(`Category Removed (index: ${index})`);
    console.log('Categories After Removal:', remainingCategories);
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

    // Log budget data before submission
    console.log('Budget Data on Submit:', budgetData);
    console.log('Category Data on Submit:', categoryData);

    addBudget(budgetData);

    // Reset Form
    setBudgetName('');
    setTotalAmount(0);
    setCategories([{ name: '', allocatedAmount: 0, spentAmount: 0 }]);
    setStartDate('');
    setEndDate('');

    // Log form reset
    console.log('Form Reset: Budget Name, Total Amount, Categories, Start and End Date reset to initial values');
  };

  return (
    <form onSubmit={handleSubmit} className="add-budget-form">
      {/* <h3>Add New Budget</h3> */}

      <div>
        <label>Budget Name</label>
        <input
          type="text"
          value={budgetName}
          onChange={(e) => {
            setBudgetName(e.target.value);
            logStateChange('Budget Name', e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label>Total Amount</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(Number(e.target.value));
            logStateChange('Total Amount', e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            logStateChange('Start Date', new Date(e.target.value));
          }}
          required
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            logStateChange('End Date', new Date(e.target.value));
          }}
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

            <input
              type="number"
              placeholder="Allocated Amount"
              value={category.allocatedAmount}
              onChange={(e) => handleCategoryChange(index, 'allocatedAmount', Number(e.target.value))}
              required
            />


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
