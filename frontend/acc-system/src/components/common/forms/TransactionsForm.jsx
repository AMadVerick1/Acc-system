import React, { useState } from 'react';

export default function TransactionForm({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        date: initialData?.date || '',
        description: initialData?.description || '',
        source: initialData?.source || '',
        amount: initialData?.amount || '',
        type: initialData?.type || 'income',
        status: initialData?.status || 'Pending',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="source">Source:</label>
                <input
                    type="text"
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="type">Transaction Type:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Received">Received</option>
                    <option value="Paid">Paid</option>
                </select>
            </div>
            <button type="submit" className="btn-submit">Save Transaction</button>
        </form>
    );
}
