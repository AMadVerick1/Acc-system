import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import AccountForm from './accountsForm';
import './tr_style.css';

export default function TransactionForm({ onSubmit, initialData }) {
    const { accounts, fetchAccounts } = useAccounts(); // Get the accounts from context

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

    // Log when the component mounts and initial state
    useEffect(() => {
        console.log('TransactionForm mounted');
        console.log('Initial formData:', formData);
        fetchAccounts()
            .then(() => {
                console.log('Fetched accounts successfully:', accounts);
            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
            });
    }, []); // Empty dependency array ensures this runs once on mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field changed: ${name} = ${value}`);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('TransactionForm submitted with formData:', formData);
        onSubmit(formData);  // Pass formData back to the parent component
    };

    const handleCreateAccount = (accountData) => {
        console.log('Creating new account with data:', accountData);

        // Simulate account creation delay
        setTimeout(() => {
            console.log("Account created successfully:", accountData);
            setShowAccountForm(false); // Hide account form after creation
            fetchAccounts()
                .then(() => {
                    console.log('Accounts list refreshed:', accounts);
                })
                .catch((error) => {
                    console.error('Error refreshing accounts:', error);
                });
        }, 1000);
    };

    const handleShowAccountForm = () => {
        console.log('Show AccountForm triggered');
        setShowAccountForm(true);
    };

    const handleHideAccountForm = () => {
        console.log('Hide AccountForm triggered');
        setShowAccountForm(false);
    };

    if (showAccountForm) {
        // Render AccountForm when showAccountForm is true
        console.log('Rendering AccountForm');
        return (
            <div className="account-form-container">
                <h2>Create a New Account</h2>
                <AccountForm onSubmit={handleCreateAccount} />
                <button onClick={handleHideAccountForm} className="btn-back">
                    Back to Transaction Form
                </button>
            </div>
        );
    }

    if (accounts.length === 0) {
        // No accounts available and not showing AccountForm
        console.log('No accounts available, prompting user to create one');
        return (
            <div className="no-accounts">
                <h2>No Accounts Found</h2>
                <p>Please create an account before adding a transaction.</p>
                <button onClick={handleShowAccountForm} className="btn-create-account">
                    Create New Account
                </button>
            </div>
        );
    }

    // Default render when showAccountForm is false and accounts exist
    console.log('Rendering TransactionForm with existing accounts');
    return (
        <form onSubmit={handleSubmit} className="transaction-form">
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
                <button type="button" onClick={handleShowAccountForm} className="btn-create-account">
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
