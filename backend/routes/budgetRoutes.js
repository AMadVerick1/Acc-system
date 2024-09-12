const express = require('express');
const router = express.Router();
const {getBudgets, createBudget, updateBudget, deleteBudget} = require('../controllers/budgetController');

// Route to get all budgets
router.get('/get-budget-items', getBudgets)
      .post('/add-budget-item', createBudget)
      .put('/update-budget-item/:id', updateBudget)
      .delete('/delete-budget-item/:id', deleteBudget);

module.exports = router;
