import React, { useState } from 'react';
import BudgetItemsTable from '../../../components/common/tables/BudgetTable';
import BudgetBreakdownChart from '../../../components/common/charts/BudgetChart';
import AddBudgetItemModal from '../../../components/common/modals/BudgetItemsModal';
import '../styles.css';

export default function BudgetOverview() {
    const [budgetItems, setBudgetItems] = useState([
        { category: 'Marketing', planned: 1000, actual: 900 },
        { category: 'Office Supplies', planned: 500, actual: 600 },
        { category: 'Salaries', planned: 3000, actual: 3100 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(null); // Track the index of the item being edited
    const [isEditing, setIsEditing] = useState(false);

    const addOrEditBudgetItem = (newItem) => {
        if (isEditing) {
            // Edit the existing item
            const updatedItems = [...budgetItems];
            updatedItems[currentItemIndex] = newItem;
            setBudgetItems(updatedItems);
        } else {
            // Add a new item
            setBudgetItems([...budgetItems, newItem]);
        }
        resetModal();
    };

    const editBudgetItem = (index) => {
        setCurrentItemIndex(index);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const deleteBudgetItem = (index) => {
        const updatedItems = budgetItems.filter((_, i) => i !== index);
        setBudgetItems(updatedItems);
    };

    const resetModal = () => {
        setIsEditing(false);
        setCurrentItemIndex(null);
        setIsModalOpen(false);
    };

    return (
        <div className="budget-overview">
            <h2>Budget Overview</h2>

            {/* Add Budget Item Button */}
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                + {isEditing ? 'Edit Budget Item' : 'Add Budget Item'}
            </button>

            {/* Modal for Adding/Editing Budget Item */}
            <AddBudgetItemModal
                isOpen={isModalOpen}
                onClose={resetModal}
                onAdd={addOrEditBudgetItem}
                initialData={isEditing ? budgetItems[currentItemIndex] : null} // Pass current data if editing
            />

            {/* Budget Breakdown Chart */}
            <div className="budget-chart-section">
                <BudgetBreakdownChart items={budgetItems} />
            </div>

            {/* Budget Items Table */}
            <div className="budget-table-section">
                <BudgetItemsTable
                    items={budgetItems}
                    onEdit={editBudgetItem}
                    onDelete={deleteBudgetItem}
                />
            </div>
        </div>
    );
}