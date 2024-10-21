import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
import ExportOptions from '../export/ExportOptions'; // Import ExportOptions component

export default function Insights() {
    const [insights, setInsights] = useState([]);
    const { accounts } = useAccounts();
    const { transactions } = useTransactions(); // Fetch transactions from context

    // State to store calculated financial indicators
    const [operatingCashflow, setOperatingCashflow] = useState(0);
    const [workingCapital, setWorkingCapital] = useState(0);
    const [currentRatio, setCurrentRatio] = useState(0);
    const [debtToEquity, setDebtToEquity] = useState(0);
    const [quickRatio, setQuickRatio] = useState(0);
    const [leverage, setLeverage] = useState(0);

    console.log("Accounts:", accounts); // Debugging log for accounts
    console.log("Transactions:", transactions); // Debugging log for transactions

    // Calculate Total Assets
    const calculateTotalAssets = () => {
        let totalAssets = 0;
        accounts.forEach(account => {
            if (account.category === 'assets') {
                totalAssets += account.balance || 0;
            }
        });
        console.log("Total Assets Calculated:", totalAssets); // Log total assets calculation
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
        console.log("Total Liabilities Calculated:", totalLiabilities); // Log total liabilities calculation
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
        console.log("Total Equity Calculated:", totalEquity); // Log total equity calculation
        return totalEquity;
    };

    // Operating Cash Flow Calculation
    const calculateOperatingCashFlow = () => {
        const incomeTransactions = transactions.filter(t => t.type === 'income') || [];
        const expenseTransactions = transactions.filter(t => t.type === 'expense') || [];

        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
        const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

        console.log("Total Income Calculated:", totalIncome); // Log total income calculation
        console.log("Total Expenses Calculated:", totalExpenses); // Log total expenses calculation
        console.log("Operating Cash Flow:", totalIncome - totalExpenses); // Log operating cash flow calculation

        return totalIncome - totalExpenses;
    };

    // Debt-to-Equity Ratio Calculation
    const calculateDebtToEquity = () => {
        const totalLiabilities = calculateTotalLiabilities();
        const totalEquity = calculateTotalEquity();
        const ratio = totalEquity !== 0 ? totalLiabilities / totalEquity : 0;
        console.log("Debt-to-Equity Ratio Calculated:", ratio); // Log debt-to-equity ratio calculation
        return ratio;
    };

    // Current Ratio Calculation
    const calculateCurrentRatio = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        const ratio = totalLiabilities !== 0 ? totalAssets / totalLiabilities : 0;
        console.log("Current Ratio Calculated:", ratio); // Log current ratio calculation
        return ratio;
    };

    // Working Capital Calculation
    const calculateWorkingCapital = () => {
        const totalAssets = calculateTotalAssets();
        const totalLiabilities = calculateTotalLiabilities();
        const workingCapital = totalAssets - totalLiabilities;
        console.log("Working Capital Calculated:", workingCapital); // Log working capital calculation
        return workingCapital;
    };

    // Calculate all indicators on component mount using useEffect
    useEffect(() => {
        const fetchData = async () => {
            const operatingCashflow = calculateOperatingCashFlow();
            const workingCapital = calculateWorkingCapital();
            const currentRatio = calculateCurrentRatio();
            const debtToEquity = calculateDebtToEquity();

            console.log("Setting State for Calculated Indicators...");
            setOperatingCashflow(operatingCashflow);
            setWorkingCapital(workingCapital);
            setCurrentRatio(currentRatio);
            setDebtToEquity(debtToEquity);

            const totalAssets = calculateTotalAssets();
            const totalLiabilities = calculateTotalLiabilities();
            const leverageRatio = totalAssets !== 0 ? totalLiabilities / totalAssets : 0;
            console.log("Leverage Ratio Calculated:", leverageRatio); // Log leverage ratio calculation
            setLeverage(leverageRatio);

            const quickAssets = totalAssets; // Assuming no inventory
            const quickRatio = totalLiabilities !== 0 ? quickAssets / totalLiabilities : 0;
            console.log("Quick Ratio Calculated:", quickRatio); // Log quick ratio calculation
            setQuickRatio(quickRatio);
        };

        fetchData();
    }, [accounts, transactions]); // Trigger only when accounts or transactions change

    // Generate insights based on financial indicators
    useEffect(() => {
        console.log("Generating Insights..."); // Log insight generation trigger
        const generatedInsights = generateInsights({
            operatingCashflow,
            workingCapital,
            currentRatio,
            debtToEquity,
            quickRatio,
            leverage,
        });
        console.log("Generated Insights:", generatedInsights); // Log generated insights
        setInsights(generatedInsights);
    }, [operatingCashflow, workingCapital, currentRatio, debtToEquity, quickRatio, leverage]);

    // Function to generate insights based on financial indicators
    const generateInsights = ({
        operatingCashflow,
        workingCapital,
        currentRatio,
        debtToEquity,
        quickRatio,
        leverage
    }) => {
        const insightsList = [];

        // Operating Cashflow Insight
        if (operatingCashflow < 0) {
            insightsList.push("Your operating cash flow is negative. You may need to cut down expenses or increase revenue to maintain financial health.");
        } else if (operatingCashflow > 0) {
            insightsList.push("Your operating cash flow is positive, which indicates a healthy cash flow. Keep monitoring to ensure this remains stable.");
        }

        // Working Capital Insight
        if (workingCapital < 0) {
            insightsList.push("Your working capital is negative. Consider paying down short-term liabilities or increasing current assets.");
        } else if (workingCapital > 0) {
            insightsList.push("You have positive working capital, which indicates you have enough short-term assets to cover short-term liabilities.");
        }

        // Current Ratio Insight
        if (currentRatio < 1) {
            insightsList.push("Your current ratio is below 1, indicating potential liquidity problems. You may struggle to pay off short-term obligations.");
        } else if (currentRatio > 2) {
            insightsList.push("Your current ratio is high, indicating a strong liquidity position, but it could also suggest you are not using assets efficiently.");
        } else {
            insightsList.push("Your current ratio is in a healthy range. Continue managing your current assets and liabilities well.");
        }

        // Debt-to-Equity Ratio Insight
        if (debtToEquity > 2) {
            insightsList.push("Your debt-to-equity ratio is high. This indicates heavy reliance on debt, which could pose a risk in case of financial downturns.");
        } else if (debtToEquity < 0.5) {
            insightsList.push("Your debt-to-equity ratio is low, suggesting you are relying more on equity financing, which is generally safer.");
        } else {
            insightsList.push("Your debt-to-equity ratio is in a healthy range. You have a balanced approach to debt and equity financing.");
        }

        // Quick Ratio Insight
        if (quickRatio < 1) {
            insightsList.push("Your quick ratio is below 1, suggesting you might not have enough liquid assets to cover immediate liabilities.");
        } else if (quickRatio > 1) {
            insightsList.push("Your quick ratio is above 1, indicating you have enough liquid assets to cover short-term liabilities.");
        }

        // Leverage Insight
        if (leverage > 0.6) {
            insightsList.push("Your leverage is high, which could indicate excessive debt relative to your assets. Consider reducing liabilities.");
        } else if (leverage < 0.3) {
            insightsList.push("Your leverage is low, indicating a conservative use of debt. This is generally positive but could mean you are not taking advantage of financial leverage.");
        }

        return insightsList;
    };

    const exportData = [
        { name: 'Operating Cashflow', value: operatingCashflow },
        { name: 'Working Capital', value: workingCapital },
        { name: 'Current Ratio', value: currentRatio },
        { name: 'Debt-to-Equity Ratio', value: debtToEquity },
        { name: 'Quick Ratio', value: quickRatio },
        { name: 'Leverage', value: leverage },
    ];

    return (
        <div className="insights-page">
            <h2>Financial Insights & Recommendations</h2>
            <div className="insights-list">
                {insights.length > 0 ? (
                    insights.map((insight, index) => (
                        <div key={index} className="insight-card">
                            <p>{insight}</p>
                        </div>
                    ))
                ) : (
                    <p>No insights available yet. Please check back later.</p>
                )}
                <ExportOptions data={exportData} /> 
            </div>
        </div>
    );
}
