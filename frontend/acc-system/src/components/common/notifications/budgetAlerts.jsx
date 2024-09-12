import React from 'react';

export default function BudgetAlert({ budget }) {
    return (
        <div className="budget-alerts">
            <h2>Alerts</h2>
            <ul>
                {budget.categories.map(category => (
                    category.alerts.map(alert => (
                        <li key={`${category.name}-${alert}`}>
                            <strong>{category.name}:</strong> {alert}
                        </li>
                    ))
                ))}
            </ul>
        </div>
    );
}
