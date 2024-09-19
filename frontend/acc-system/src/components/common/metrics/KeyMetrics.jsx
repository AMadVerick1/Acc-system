import React, { useEffect, useState } from 'react';
import { calculateTotalBalance, calculateBudgetEfficiency, calculateIncomeVsExpenses } from '../../../services/kpiService';

const KeyMetrics = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [budgetEfficiency, setBudgetEfficiency] = useState(0);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState({ income: 0, expenses: 0, net: 0 });

  useEffect(() => {
    async function fetchKPIs() {
      const balance = await calculateTotalBalance();
      setTotalBalance(balance);

      const efficiency = await calculateBudgetEfficiency(/* pass relevant budgetId */);
      setBudgetEfficiency(efficiency);

      const cashFlow = await calculateIncomeVsExpenses();
      setIncomeVsExpenses(cashFlow);
    }

    fetchKPIs();
  }, []);

  return (
    <div>
      <h2>KPI Overview</h2>
      <div>Total Balance: ${totalBalance}</div>
      <div>Budget Efficiency: {budgetEfficiency.toFixed(2)}%</div>
      <div>Income: ${incomeVsExpenses.income}</div>
      <div>Expenses: ${incomeVsExpenses.expenses}</div>
      <div>Net Income: ${incomeVsExpenses.net}</div>
    </div>
  );
};

export default KeyMetrics;
