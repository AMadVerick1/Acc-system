import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
import ExportOptions from '../export/ExportOptions'; // Import ExportOptions component
import './metrics.css';

export default function HealthIndicators() {
    const { accounts } = useAccounts();
    const { transactions } = useTransactions(); // Fetch transactions from context

    // State to store calculated financial indicators
    const [operatingCashflow, setOperatingCashflow] = useState(0);
    const [workingCapital, setWorkingCapital] = useState(0);
    const [currentRatio, setCurrentRatio] = useState(0);
    const [debtToEquity, setDebtToEquity] = useState(0);
    const [quickRatio, setQuickRatio] = useState(0);
    const [leverage, setLeverage] = useState(0);

    // Calculate Total Assets
    const calculateTotalAssets = () => {
        return accounts
            .filter(account => account.category === 'assets')
            .reduce((total, account) => total + (account.balance || 0), 0);
    };

    // Calculate Total Liabilities
    const calculateTotalLiabilities = () => {
        return accounts
            .filter(account => account.category === 'liability')
            .reduce((total, account) => total + (account.balance || 0), 0);
    };

    // Calculate Total Equity
    const calculateTotalEquity = () => {
        return accounts
            .filter(account => account.category === 'equity')
            .reduce((total, account) => total + (account.balance || 0), 0);
    };

    // Operating Cash Flow Calculation
    const calculateOperatingCashFlow = () => {
        const incomeTransactions = transactions.filter(t => t.type === 'Income') || [];
        const expenseTransactions = transactions.filter(t => t.type === 'Expense') || [];

        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

        return totalIncome - totalExpenses;
    };

    // Debt-to-Equity Ratio Calculation
    const calculateDebtToEquity = () => {
        const totalLiabilities = calculateTotalLiabilities();
        const totalEquity = calculateTotalEquity();
        return totalEquity !== 0 ? totalLiabilities / totalEquity : 0;
    };

    // Current Ratio Calculation
    const calculateCurrentRatio = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        return totalLiabilities !== 0 ? totalAssets / totalLiabilities : 0;
    };

    // Working Capital Calculation
    const calculateWorkingCapital = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        return totalAssets - totalLiabilities;
    };

    // Calculate all indicators on component mount using useEffect
    useEffect(() => {
        const operatingCashflow = calculateOperatingCashFlow();
        const workingCapital = calculateWorkingCapital();
        const currentRatio = calculateCurrentRatio();
        const debtToEquity = calculateDebtToEquity();

        setOperatingCashflow(operatingCashflow);
        setWorkingCapital(workingCapital);
        setCurrentRatio(currentRatio);
        setDebtToEquity(debtToEquity);

        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        const leverageRatio = totalAssets !== 0 ? totalLiabilities / totalAssets : 0;
        setLeverage(leverageRatio);

        const quickAssets = totalAssets; // Assuming no inventory
        const quickRatio = totalLiabilities !== 0 ? quickAssets / totalLiabilities : 0;
        setQuickRatio(quickRatio);
    }, [accounts, transactions]); // Recalculate when accounts or transactions change

    // Combine calculated data to pass to ExportOptions
    const data = {
        operatingCashflow,
        workingCapital,
        currentRatio,
        debtToEquity,
        quickRatio,
        leverage,
    };

    return (
        <div className="financial-health-indicators">
            <h1>Financial Health Indicators</h1>
            <div className="health-indicators">
                
                <div className="indicator-card">
                    <h3>Operating Cashflow</h3>
                    <p>{operatingCashflow}</p>
                </div>
                <div className="indicator-card">
                    <h3>Working Capital</h3>
                    <p>{workingCapital}</p>
                </div>
                <div className="indicator-card">
                    <h3>Current Ratio</h3>
                    <p>{currentRatio}</p>
                </div>
                <div className="indicator-card">
                    <h3>Debt-to-Equity Ratio</h3>
                    <p>{debtToEquity}</p>
                </div>
                <div className="indicator-card">
                    <h3>Quick Ratio</h3>
                    <p>{quickRatio}</p>
                </div>
                <div className="indicator-card">
                    <h3>Leverage</h3>
                    <p>{leverage}</p>
                </div>
                <ExportOptions data={data} />
            </div>
        </div>
    );
}
