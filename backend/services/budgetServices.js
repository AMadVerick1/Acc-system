const Budget = require('../models/budgetModel');

const getAllBudgets = async () => {
  try {
    return await Budget.find();
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw error;
  }
};

const createBudget = async (budgetData) => {
  try {
    const newBudget = new Budget({ ...budgetData });
    return await newBudget.save();
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

const updateBudget = async (budgetId, updateData) => {
  try {
    const budget = await Budget.findByIdAndUpdate(
      budgetId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!budget) {
      throw new Error('Budget not found');
    }

    return budget;
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

const deleteBudget = async (budgetId) => {
  try {
    const budget = await Budget.findByIdAndDelete(budgetId);

    if (!budget) {
      throw new Error('Budget not found');
    }

    return { message: 'Budget deleted successfully' };
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw error;
  }
};

module.exports = {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
