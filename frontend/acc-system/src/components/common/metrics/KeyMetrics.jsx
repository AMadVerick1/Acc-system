import React, { useEffect, useState } from 'react';
import { useTotalBalance, useIncomeVsExpenses, useNetWorth, useSavingsRate } from '../../../services/kpiService';

const KPIMetrics = () => {
  // Using the custom hooks from kpiService
  const { totalBalance, loading: balanceLoading, error: balanceError } = useTotalBalance();
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
    <div className="kpi-metrics">
      <p>Total Balance: {totalBalance}</p>
      <p>Income: {incomeVsExpenses.income}</p>
      <p>Expenses: {incomeVsExpenses.expenses}</p>
      <p>Net: {incomeVsExpenses.net}</p>
      <p>Net Worth: {netWorth}</p>
      <p>Savings Rate: {savingsRate}%</p>
    </div>
  );
};

export default KPIMetrics;
