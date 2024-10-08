import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
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
        let totalAssets = 0;
        accounts.forEach(account => {
            if (account.category === 'assets') {
                totalAssets += account.balance || 0;
            }
        });
        console.log('Total Assets:', totalAssets);
        return totalAssets;
    };

    // Calculate Total Liabilities
    const calculateTotalLiabilities = () => {
        let totalLiabilities = 0;
        accounts.forEach(account => {
            if (account.category === 'liability') {
                totalLiabilities += account.balance || 0;
            }
        });
        console.log('Total Liabilities:', totalLiabilities);
        return totalLiabilities;
    };

    // Calculate Total Equity
    const calculateTotalEquity = () => {
        let totalEquity = 0;
        accounts.forEach(account => {
            if (account.category === 'equity') {
                totalEquity += account.balance || 0;
            }
        });
        console.log('Total Equity:', totalEquity);
        return totalEquity;
    };

    // Operating Cash Flow Calculation
    const calculateOperatingCashFlow = () => {
        const incomeTransactions = transactions.filter(t => t.type === 'Income') || [];
        const expenseTransactions = transactions.filter(t => t.type === 'Expense') || [];

        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

        console.log('Total Income:', totalIncome);
        console.log('Total Expenses:', totalExpenses);
        console.log('Operating Cashflow:', totalIncome - totalExpenses);

        return totalIncome - totalExpenses;
    };

    // Debt-to-Equity Ratio Calculation
    const calculateDebtToEquity = () => {
        const totalLiabilities = calculateTotalLiabilities();
        const totalEquity = calculateTotalEquity();
        const ratio = totalEquity !== 0 ? totalLiabilities / totalEquity : 0;
        console.log('Debt-to-Equity Ratio:', ratio);
        return ratio;
    };

    // Current Ratio Calculation
    const calculateCurrentRatio = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        const ratio = totalLiabilities !== 0 ? totalAssets / totalLiabilities : 0;
        console.log('Current Ratio:', ratio);
        return ratio;
    };

    // Working Capital Calculation
    const calculateWorkingCapital = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        const workingCapital = totalAssets - totalLiabilities;
        console.log('Working Capital:', workingCapital);
        return workingCapital;
    };

    // Calculate all indicators on component mount using useEffect
    useEffect(() => {
        const fetchData = async () => {
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
            console.log('Leverage Ratio:', leverageRatio);
            setLeverage(leverageRatio);

            const quickAssets = totalAssets; // Assuming no inventory
            const quickRatio = totalLiabilities !== 0 ? quickAssets / totalLiabilities : 0;
            console.log('Quick Ratio:', quickRatio);
            setQuickRatio(quickRatio);
        };

        fetchData();
    }, []);

    return (
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
        </div>
    );
}
