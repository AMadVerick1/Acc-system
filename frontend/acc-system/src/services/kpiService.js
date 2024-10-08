import { useAccounts } from '../context/accountContext';
import { useTransactions } from '../context/transactionContext';
import { useBudget } from '../context/budgetContext';
import { useEffect, useState } from 'react';

// Custom hook for calculating total balance
export const useTotalBalance = () => {
  const { accounts,fetchAccounts } = useAccounts();
  const [totalBalance, setTotalBalance] = useState(null); // Store the total balance
  // const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchAccounts();
  }, []);

  const calculateTotalBalance = async () => {
    try {
      console.log('Fetching accounts in kpiServices...');
     
      console.log('Accounts fetched in kpiServices:', accounts);

      const accountsArray = accounts || []; // Default to empty array if accounts is undefined
      const calculatedBalance = accountsArray.reduce((total, account) => {
        const accountBalance = account.balance || 0;
        console.log(`Account balance in kpiServices: ${accountBalance}`);
        return total + accountBalance;
      }, 0);

      console.log('Total balance calculated in kpiServices:', calculatedBalance);
      setTotalBalance(calculatedBalance); // Set the calculated balance
    } catch (error) {
      console.error('Error calculating total balance in kpiServices:', error);
      setError(error); // Handle error
    }
  };

  useEffect(() => {
    calculateTotalBalance(); // Calculate balance on mount
  }, []);

  return { totalBalance }; // Return balance, loading, and error
};


// Custom hook for calculating income vs expenses
export const useIncomeVsExpenses = () => {
  const { transactions, fetchAllTransactions } = useTransactions();
  const [incomeVsExpenses, setIncomeVsExpenses] = useState({ income: 0, expenses: 0, net: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const calculateIncomeVsExpenses = async () => {
    try {
      console.log('Fetching all transactions in kpiServices...');
      // const transactions = await fetchAllTransactions();
      console.log('Transactions fetched in kpiServices:', transactions);

      const transactionsArray = transactions || []; // Default to empty array if transactions are undefined
      const income = transactionsArray
        .filter(tr => tr.type === 'Income')
        .reduce((sum, tr) => {
          const amount = tr.amount || 0;
          console.log(`Income transaction amount in kpiServices: ${amount}`);
          return sum + amount;
        }, 0);

      const expenses = transactionsArray
        .filter(tr => tr.type === 'Expense')
        .reduce((sum, tr) => {
          const amount = tr.amount || 0;
          console.log(`Expense transaction amount in kpiServices: ${amount}`);
          return sum + amount;
        }, 0);

      const net = income - expenses;
      console.log(`Total income in kpiServices: ${income}, Total expenses in kpiServices: ${expenses}, Net: ${net}`);
      setIncomeVsExpenses({ income, expenses, net });
    } catch (error) {
      console.error('Error calculating income vs expenses in kpiServices:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateIncomeVsExpenses();
  }, []);

  return { incomeVsExpenses };
};


// Custom hook for calculating net worth
export const  useNetWorth = () => {
  const { calculateTotalBalance } = useTotalBalance();
  const { calculateIncomeVsExpenses } = useIncomeVsExpenses();

  const calculateNetWorth = async () => {
    try {
      console.log('Calculating total balance in kpiServices...');
      const totalBalance = await calculateTotalBalance();
      console.log('Total balance in kpiServices:', totalBalance);

      console.log('Calculating income vs expenses in kpiServices...');
      const { income, expenses } = await calculateIncomeVsExpenses();
      console.log(`Income in kpiServices: ${income}, Expenses in kpiServices: ${expenses}`);

      const netWorth = totalBalance + income - expenses;
      console.log('Net worth calculated in kpiServices:', netWorth);
      return netWorth;
    } catch (error) {
      console.error('Error calculating net worth in kpiServices:', error);
      throw error;
    }
  };

  return { calculateNetWorth };
};

export const useBudgetEfficiency = () => {
  const { budgetItems, fetchBudgetOverview } = useBudget();
  const [efficiency, setEfficiency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBudgetOverview();
      calculateEfficiency(); // Call after fetching
    };

    fetchData(); // Call the async function
  }, []); // Run only on mount

  const calculateEfficiency = async () => {
    try {
      // Check if budgetItems is defined and has categories
      if (!budgetItems || !budgetItems.categories) {
        console.warn('No budget items or categories found');
        setEfficiency(0); // Set efficiency to 0 if no items
        setLoading(false);
        return;
      }

      const categories = budgetItems.categories;
      console.log('Fetched Budget Categories:', categories);

      // Calculate total spent
      const totalSpent = categories.reduce((total, cat) => {
        const spentAmount = cat.spentAmount || 0;
        console.log(`Category: ${cat.name}, Spent Amount: ${spentAmount}`);
        return total + spentAmount;
      }, 0);

      // Handle potential division by zero
      const totalAllocated = budgetItems.totalAmount || 1; // Avoid division by zero
      const calculatedEfficiency = (totalSpent / totalAllocated) * 100;

      console.log(`Total Allocated: ${totalAllocated}, Total Spent: ${totalSpent}`);
      console.log(`Budget efficiency calculated: ${calculatedEfficiency}%`);

      setEfficiency(calculatedEfficiency); // Set efficiency in state
    } catch (error) {
      console.error('Error calculating budget efficiency:', error);
      setError(error); // Set error in state
    } finally {
      setLoading(false); // Mark as not loading anymore
    }
  };

  return { efficiency, loading, error }; // Return efficiency, loading, and error states
};


export const useSavingsRate = () => {
  const { calculateNetWorth } = useNetWorth();

  const calculateSavingsRate = async () => {
    try {
      console.log('Calculating net worth...');
      const netWorth = await calculateNetWorth();
      console.log('Net worth:', netWorth);

      const savingsGoal = 50000; // Set your actual savings goal here
      const savingsRate = ((netWorth - savingsGoal) / savingsGoal) * 100;
      console.log(`Savings rate calculated: ${savingsRate}%`);
      return savingsRate;
    } catch (error) {
      console.error('Error calculating savings rate:', error);
      throw error;
    }
  };

  return { calculateSavingsRate };
};