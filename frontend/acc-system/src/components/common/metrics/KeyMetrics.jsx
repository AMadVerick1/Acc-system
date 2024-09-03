import React from 'react';
import './metrics.css';

export default function KeyMetrics() {
    const totalIncome = 5000; // Placeholder for total income calculation
    const totalExpenses = 3000; // Placeholder for total expenses calculation
    const netProfit = totalIncome - totalExpenses;
    const cashFlow = 2000; // Placeholder for cash flow calculation

    return (
        <div className="key-metrics">
            <h2>Key Metrics</h2>
            <div className="metric-cards">
                <div className="metric-card">
                    <h3>Total Income</h3>
                    <p>${totalIncome}</p>
                </div>
                <div className="metric-card">
                    <h3>Total Expenses</h3>
                    <p>${totalExpenses}</p>
                </div>
                <div className="metric-card">
                    <h3>Net Profit</h3>
                    <p>${netProfit}</p>
                </div>
                <div className="metric-card">
                    <h3>Cash Flow</h3>
                    <p>${cashFlow}</p>
                </div>
            </div>
            
        </div>
    );
}
