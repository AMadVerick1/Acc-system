import React, { useState } from 'react';
import './BudgetTable.css';

export default function BudgetItemsTable({ items, onEdit, onDelete }) {
  // State to manage hover category information
  const [hoveredItem, setHoveredItem] = useState(null);

  // Calculate total spent and allocated amounts for a budget item
  const calculateTotals = (categories) => {
    return categories.reduce(
      (totals, category) => {
        totals.spentAmount += category.spentAmount || 0;
        totals.allocatedAmount += category.allocatedAmount || 0;
        return totals;
      },
      { spentAmount: 0, allocatedAmount: 0 }
    );
  };

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
            <th>Spent Amount</th>
            <th>Variance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const totals = calculateTotals(item.categories);
            const variance = (item.totalAmount || 0) - (totals.spentAmount || 0);
            return (
              <tr
                key={item._id}
                onMouseEnter={() => setHoveredItem(item._id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <td>{item.name}</td>
                <td>
                  <div className="category-cell">
                    {item.categories.length} Categories
                    {hoveredItem === item._id && (
                      <div className="category-tooltip">
                        {item.categories.map((category, index) => (
                          <div key={index} className="category-item">
                            <strong>{category.name}:</strong> Spent: R{category.spentAmount || 0}, Allocated: R{category.allocatedAmount || 0}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>R{item.totalAmount || 0}</td>
                <td>R{item.allocatedAmount || 0}</td>
                <td>R{totals.spentAmount}</td>
                <td className={variance > 0 ? 'positive' : 'negative'}>
                  R{variance}
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
