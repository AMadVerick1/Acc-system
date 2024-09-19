import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import AccountForm from './accountsForm';
import './tr_style.css';

export default function TransactionForm({ onSubmit, initialData }) {
    const { accounts, fetchAccounts } = useAccounts();
    const [formType, setFormType] = useState('Transaction');
    const [invoiceItems, setInvoiceItems] = useState([{ description: '', quantity: 1, price: 0 }]);

    const handleFormTypeChange = (e) => setFormType(e.target.value);

    const [formData, setFormData] = useState({
        account: initialData?.account || '',
        date: initialData?.date || '',
        description: initialData?.description || '',
        source: initialData?.source || '',
        amount: initialData?.amount || '',
        type: initialData?.type || 'Income',
        status: initialData?.status || 'Pending',
    });

    const [showAccountForm, setShowAccountForm] = useState(false);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'Invoice' || formType === 'Quotation') {
            const totalAmount = invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
            onSubmit({ ...formData, amount: totalAmount, items: invoiceItems });
        } else {
            onSubmit(formData);
        }
    };

    const handleCreateAccount = (accountData) => {
        setShowAccountForm(false);
        fetchAccounts();
    };

    const handleInvoiceItemChange = (index, field, value) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index][field] = value;
        setInvoiceItems(updatedItems);
    };

    const addInvoiceItem = () => {
        setInvoiceItems([...invoiceItems, { description: '', quantity: 1, price: 0 }]);
    };

    if (showAccountForm) {
        return (
            <div className="account-form-container">
                <h2>Create a New Account</h2>
                <AccountForm onSubmit={handleCreateAccount} />
                <button onClick={() => setShowAccountForm(false)} className="btn-back">
                    Back to Transaction Form
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
                {/* <div className="form-group">
                    <label htmlFor="formType">Form Type:</label>
                    <select id="formType" value={formType} onChange={handleFormTypeChange}>
                        <option value="Transaction">Transaction</option>
                        <option value="Invoice">Invoice</option>
                        <option value="Quotation">Quotation</option>
                    </select>
                </div> */}

            <div className="form-group">
                <label htmlFor="account">Account:</label>
                <select
                    id="account"
                    name="account"
                    value={formData.account}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an Account</option>
                    {accounts.map((account) => (
                        <option key={account._id} value={account._id}>
                            {account.name} - {account.type}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => setShowAccountForm(true)} className="btn-create-account">
                    + Create New Account
                </button>
            </div>

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

            {formType === 'Transaction' ? (
                <>
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
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                </>
            ) : (
                <>
                    <h3>{formType} Details</h3>
                    {invoiceItems.map((item, index) => (
                        <div key={index} className="invoice-item">
                            <input
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleInvoiceItemChange(index, 'description', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleInvoiceItemChange(index, 'quantity', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleInvoiceItemChange(index, 'price', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addInvoiceItem}>
                        + Add Item
                    </button>
                    <p>
                        Total Amount: {invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0)}
                    </p>
                </>
            )}

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

            <button type="submit" className="btn-submit">Save {formType}</button>
        </form>
    );
}
