import '../styles.css';
import React, { useState, useEffect } from 'react';
import BudgetItemsTable from '../../../components/common/tables/BudgetTable';
import AddBudgetItemModal from '../../../components/common/modals/BudgetItemsModal';
import { useBudget } from '../../../context/budgetContext';

export default function BudgetOverview() {
    const { budgetItems, fetchBudgetOverview, addBudget, editBudgetItem, removeBudgetItem, loading, error } = useBudget(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchBudgetOverview(); 
    }, []);

    const addOrEditBudgetItem = async (item) => {
        if (isEditing && currentItem) {
            await editBudgetItem(currentItem._id, item); // Ensure consistency in ID field
        } else {
            await addBudget(item);
        }
        resetModal();
    };

    const editBudgetItemHandler = (item) => {
        setCurrentItem(item);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        await removeBudgetItem(id);
    };

    const resetModal = () => {
        setIsEditing(false);
        setCurrentItem(null);
        setIsModalOpen(false);
    };

    return (
        <div className="budget-overview">
            <h2>Budget Overview</h2>

            {error && <p className="error-message">{error}</p>} {/* Display error messages */}

            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                + {isEditing ? 'Edit Budget Item' : 'Add Budget Item'}
            </button>

            <AddBudgetItemModal
                isOpen={isModalOpen}
                onClose={resetModal}
                onAdd={addOrEditBudgetItem}
                initialData={isEditing ? currentItem : null} // Pass current data if editing
            />

            <div className="budget-table-section">
                <BudgetItemsTable
                    items={budgetItems}
                    onEdit={editBudgetItemHandler}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
