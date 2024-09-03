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
  const { name, totalAmount, allocatedAmount, category, startDate, endDate } = req.body;

  // Validation
  if (!name || !totalAmount || !allocatedAmount || !category || !startDate || !endDate) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount must be a positive number' });
  }
  if (typeof allocatedAmount !== 'number') {
    return res.status(400).json({ message: 'Allocated amount must be a number' });
  }

  try {
    const newBudgetData = {
      name,
      totalAmount,
      allocatedAmount,
      category,
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
  const { name, totalAmount, allocatedAmount, category, startDate, endDate } = req.body;
  const budgetId = req.params.id;

  // Validation
  if (!name || !totalAmount || !allocatedAmount || !category || !startDate || !endDate) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount must be a positive number' });
  }
  if (typeof allocatedAmount !== 'number') {
    return res.status(400).json({ message: 'Allocated amount must be a number' });
  }

  try {
    const updatedData = { name, totalAmount, allocatedAmount, category, startDate, endDate };
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
