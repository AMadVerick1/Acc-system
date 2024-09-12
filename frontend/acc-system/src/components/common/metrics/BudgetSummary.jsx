import React from 'react';

export default function BudgetSummary({ budget }) {
    return (
        <div className="budget-summary">
            <h2>{budget.name} Summary</h2>
            <p>Total Amount: R{budget.totalAmount}</p>
            <p>Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
        </div>
    );
}
