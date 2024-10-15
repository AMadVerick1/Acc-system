import React from 'react';
import './budget_list.css';

export default function BudgetList({ budgets, onSelectBudget }) {
    return (
        <div className="budget-list">
            <h2>Budgets List</h2>
            <ul>
                {budgets.map(budget => (
                    <li key={budget._id} onClick={() => onSelectBudget(budget)}>
                        {budget.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
