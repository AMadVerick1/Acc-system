import React, { useState, useEffect } from 'react';
import { addTransaction } from '../../../services/transactionServices';

export default function AddBudgetItemForm({ onAdd, onClose, initialData }) {
    const [formData, setFormData] = useState({
        category: '',
        planned: '',
        actual: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData); // Pre-fill the form with existing data when editing
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTransaction = await addTransaction(formData);
            onFormSubmit(newTransaction); // Update the parent component
        } catch (error) {
            console.error('Error adding budget item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-budget-item-form">
            <div className="form-group">
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Planned Amount:</label>
                <input
                    type="number"
                    name="planned"
                    value={formData.planned}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Actual Amount:</label>
                <input
                    type="number"
                    name="actual"
                    value={formData.actual}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn-submit">
                {initialData ? 'Save Changes' : 'Add Item'}
            </button>
        </form>
    );
}
