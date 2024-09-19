import { getAllAccounts } from './accountService';
import { getBudgetOverview } from './budgetService';
import { getAllTransactions } from './transactionServices';

export const calculateTotalBalance = async () => {
  const accounts = await getAllAccounts();
  return accounts.reduce((total, account) => total + account.balance, 0);
};

export const calculateBudgetEfficiency = async (budgetId) => {
  const budget = await getBudgetOverview(budgetId);
  const totalSpent = budget.categories.reduce((total, cat) => total + cat.spentAmount, 0);
  const totalAllocated = budget.totalAmount;
  return (totalSpent / totalAllocated) * 100;
};

export const calculateIncomeVsExpenses = async () => {
  const transactions = await getAllTransactions();
  const income = transactions.filter(tr => tr.type === 'Income').reduce((sum, tr) => sum + tr.amount, 0);
  const expenses = transactions.filter(tr => tr.type === 'Expense').reduce((sum, tr) => sum + tr.amount, 0);
  return { income, expenses, net: income - expenses };
};

export const calculateNetWorth = async () => {
  const totalBalance = await calculateTotalBalance();
  const { income, expenses, net } = await calculateIncomeVsExpenses();
  return totalBalance + income - expenses;
};

export const calculateSavingsRate = async () => {
  const netWorth = await calculateNetWorth();
  const savingsGoal = 1;
  return (netWorth - savingsGoal) / savingsGoal * 100;
};


