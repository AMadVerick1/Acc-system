const budgetService = require('../services/budgetServices');

const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetService.getAllBudgets();
    res.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: 'Server Error: Could not retrieve budgets' });
  }
};

const createBudget = async (req, res) => {
  const { name, categories, totalAmount, startDate, endDate } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: 'Budget name is required' });
  }
  if (!totalAmount) {
    return res.status(400).json({ message: 'Total amount is required' });
  }
  if (!startDate) {
    return res.status(400).json({ message: 'Start date is required' });
  }
  if (!endDate) {
    return res.status(400).json({ message: 'End date is required' });
  }

  // Validate totalAmount
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount must be a positive number' });
  }

  // Validate startDate and endDate
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid start or end date format' });
  }
  if (start >= end) {
    return res.status(400).json({ message: 'End date must be after the start date' });
  }

  // Validate categories
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ message: 'Categories must be an array and cannot be empty' });
  }
  for (const category of categories) {
    if (!category.name) {
      return res.status(400).json({ message: 'Each category must have a name' });
    }
    if (typeof category.allocatedAmount !== 'number' || category.allocatedAmount < 0) {
      return res.status(400).json({ message: 'Allocated amount must be a non-negative number' });
    }
    if (typeof category.spentAmount !== 'number' || category.spentAmount < 0) {
      return res.status(400).json({ message: 'Spent amount must be a non-negative number' });
    }
  }

  try {
    const newBudgetData = {
      name,
      categories,
      totalAmount,
      startDate,
      endDate,
    };

    const savedBudget = await budgetService.createBudget(newBudgetData);
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ message: 'Server Error: Could not create budget' });
  }
};

const updateBudget = async (req, res) => {
  const { name, categories, totalAmount, startDate, endDate } = req.body;
  const budgetId = req.params.id;

  // Validation
  if (!name) {
    return res.status(400).json({ message: 'Budget name is required' });
  }
  if (!totalAmount) {
    return res.status(400).json({ message: 'Total amount is required' });
  }
  if (!startDate) {
    return res.status(400).json({ message: 'Start date is required' });
  }
  if (!endDate) {
    return res.status(400).json({ message: 'End date is required' });
  }

  // Validate startDate and endDate
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid start or end date format' });
  }
  if (start >= end) {
    return res.status(400).json({ message: 'End date must be after the start date' });
  }

  // Validate categories
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ message: 'Categories must be an array and cannot be empty' });
  }
  for (const category of categories) {
    if (!category.name) {
      return res.status(400).json({ message: 'Each category must have a name' });
    }
    if (typeof category.allocatedAmount !== 'number' || category.allocatedAmount < 0) {
      return res.status(400).json({ message: 'Allocated amount must be a non-negative number' });
    }
    if (typeof category.spentAmount !== 'number' || category.spentAmount < 0) {
      return res.status(400).json({ message: 'Spent amount must be a non-negative number' });
    }
  }

  try {
    const updatedData = { name, categories, totalAmount, startDate, endDate };
    const updatedBudget = await budgetService.updateBudget(budgetId, updatedData);

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(updatedBudget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ message: 'Server Error: Could not update budget' });
  }
};

const deleteBudget = async (req, res) => {
  const budgetId = req.params.id;

  try {
    const result = await budgetService.deleteBudget(budgetId);

    if (!result) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ message: 'Server Error: Could not delete budget' });
  }
};

module.exports = {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
