import { getAccounts } from './accountService';
import { getBudgets } from './budgetServices';
import { getTransactions } from './transactionsServices';

export const calculateTotalBalance = async () => {
  const accounts = await getAccounts();
  return accounts.reduce((total, account) => total + account.balance, 0);
};

export const calculateBudgetEfficiency = async (budgetId) => {
  const budget = await getBudgets(budgetId);
  const totalSpent = budget.categories.reduce((total, cat) => total + cat.spentAmount, 0);
  const totalAllocated = budget.totalAmount;
  return (totalSpent / totalAllocated) * 100;
};

export const calculateIncomeVsExpenses = async () => {
  const transactions = await getTransactions();
  const income = transactions.filter(tr => tr.type === 'Income').reduce((sum, tr) => sum + tr.amount, 0);
  const expenses = transactions.filter(tr => tr.type === 'Expense').reduce((sum, tr) => sum + tr.amount, 0);
  return { income, expenses, net: income - expenses };
};

