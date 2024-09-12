import React from 'react';

export default function BudgetList({ budgets, onSelectBudget }) {
    return (
        <div className="budget-list">
            <h2>Budgets List</h2>
            <ul>
                {budgets.map(budget => (
                    <li key={budget._id} onClick={() => onSelectBudget(budget)}>
                        <h3>{budget.name}</h3>
                        {/* <p>Total: R{budget.totalAmount}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
