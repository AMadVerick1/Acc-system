import React from 'react';

export default function BudgetItemsTable({ items, onEdit, onDelete }) {

    return (
        <div className="budget-items-table">
            <h3>Budget Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Total Amount</th>
                        <th>Allocated Amount</th>
                        <th>Variance</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        const variance = item.allocatedAmount - item.totalAmount;
                        return (
                            <tr key={item._id}> 
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>${item.totalAmount}</td>
                                <td>${item.allocatedAmount}</td>
                                <td className={variance > 0 ? 'negative' : 'positive'}>
                                    ${variance}
                                </td>
                                <td>
                                    <button onClick={() => onEdit(item._id)} className="btn-edit">Edit</button>
                                    <button onClick={() => onDelete(item._id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
