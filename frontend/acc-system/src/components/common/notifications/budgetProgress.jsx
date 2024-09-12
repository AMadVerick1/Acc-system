import React from 'react';

export default function BudgetProgress({ budget }) {
    return (
        <div className="budget-progress">
            <h2>Progress</h2>
            <ul>
                {budget.categories.map(category => (
                    <li key={category.name}>
                        <h3>{category.name}</h3>
                        <p>Allocated: R{category.allocatedAmount}</p>
                        <p>Spent: R{category.spentAmount}</p>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${category.progress}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
