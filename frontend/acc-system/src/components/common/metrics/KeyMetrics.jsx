import React, { useEffect, useState } from 'react';
import { useTotalBalance, useBudgetEfficiency, useIncomeVsExpenses, useNetWorth, useSavingsRate } from '../../../services/kpiService';

const KPIMetrics = ({ budgetId }) => {
  // Using the custom hooks from kpiService
  const { totalBalance, loading: balanceLoading, error: balanceError } = useTotalBalance();
  // const { efficiency, loading: efficiencyLoading, error: efficiencyError } = useBudgetEfficiency(budgetId);
  const { incomeVsExpenses, loading: incomeLoading, error: incomeError } = useIncomeVsExpenses();
  const { netWorth, loading: netWorthLoading, error: netWorthError } = useNetWorth();
  const { savingsRate, error: savingsError } = useSavingsRate();

  // Handle loading state for all KPIs
  if (balanceLoading || incomeLoading || netWorthLoading) {
    return <p>Loading KPI metrics...</p>;
  }

  // Handle error state for any KPI calculation
  if (balanceError || incomeError || netWorthError || savingsError) {
    return <p>Error loading KPI metrics: {balanceError?.message || incomeError?.message || netWorthError?.message || savingsError?.message}</p>;
  }

  return (
    <div>
      <p>Total Balance: {totalBalance}</p>
      {/* <p>Budget Efficiency: {efficiency}%</p> */}
      <p>Income: {incomeVsExpenses.income}</p>
      <p>Expenses: {incomeVsExpenses.expenses}</p>
      <p>Net: {incomeVsExpenses.net}</p>
      <p>Net Worth: {netWorth}</p>
      <p>Savings Rate: {savingsRate}%</p>
    </div>
  );
};

export default KPIMetrics;
