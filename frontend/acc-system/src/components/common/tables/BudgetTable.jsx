import React from 'react';

export default function BudgetItemsTable({ items, onEdit, onDelete }) {
    return (
        <div className="budget-items-table">
            <h3>Budget Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Planned Amount</th>
                        <th>Actual Amount</th>
                        <th>Variance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const variance = item.actual - item.planned;
                        return (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>${item.planned}</td>
                                <td>${item.actual}</td>
                                <td className={variance > 0 ? 'negative' : 'positive'}>
                                    ${variance}
                                </td>
                                <td>
                                    <button onClick={() => onEdit(index)} className="btn-edit">Edit</button>
                                    <button onClick={() => onDelete(index)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
