const express = require('express');
const router = express.Router();
const {getBudgets, createBudget, updateBudget, deleteBudget} = require('../controllers/budgetController');

// Route to get all budgets
router.get('/get-budget-items', getBudgets);

// Route to create a new budget
router.post('/add-budget-item', createBudget);

// Route to update a budget by ID
router.put('/update-budget-item/:id', updateBudget);

// Route to delete a budget by ID
router.delete('/delete-budget-item/:id', deleteBudget);

module.exports = router;
