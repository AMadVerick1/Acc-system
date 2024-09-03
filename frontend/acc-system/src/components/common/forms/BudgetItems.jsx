import React, { useState, useEffect } from 'react';
import { useBudget } from '../../../context/budgetContext';

export default function AddBudgetItemForm({ onClose, initialData }) {
    const { addBudget, updateBudget } = useBudget(); 
    const [formData, setFormData] = useState({
        name: '',
        totalAmount: '',
        allocatedAmount: '',
        category: 'Housing',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                startDate: initialData.startDate.split('T')[0],
                endDate: initialData.endDate.split('T')[0], 
            }); 
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
        console.log("Form Data on Submit:", formData); // Debugging Log
        try {
            if (initialData) {
                console.log("Updating Budget Item", initialData.id); // Debugging Log
                await updateBudget(initialData.id, formData);
            } else {
                console.log("Adding New Budget Item"); // Debugging Log
                await addBudget(formData);
            }
            onClose();
        } catch (error) {
            console.error("Error in form submission:", error); // Error Log
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-budget-item-form">
            {/* Form fields */}
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Savings">Savings</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Total Amount:</label>
                <input
                    type="number"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Allocated Amount:</label>
                <input
                    type="number"
                    name="allocatedAmount"
                    value={formData.allocatedAmount}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn-submit">
                {initialData ? 'Save Changes' : 'Add Budget'}
            </button>
        </form>
    );
}
