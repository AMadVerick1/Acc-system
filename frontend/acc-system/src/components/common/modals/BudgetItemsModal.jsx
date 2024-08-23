import React from 'react';
import BudgetItem from '../forms/BudgetItems.jsx';

export default function AddBudgetItemModal({ isOpen, onClose, onAdd, initialData }) {
    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{initialData ? 'Edit Budget Item' : 'Add New Budget Item'}</h3>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <BudgetItem
                    onAdd={onAdd}
                    onClose={onClose}
                    initialData={initialData}
                />
            </div>
        </div>
    );
}
