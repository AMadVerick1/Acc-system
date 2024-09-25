import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import AccountForm from './accountsForm';
import './tr_style.css';

export default function TransactionForm({ onSubmit, initialData, invoiceQuotation }) {
    const { accounts, fetchAccounts, updateAccountByID } = useAccounts();
    const [formType, setFormType] = useState('Transaction');
    const [invoiceItems, setInvoiceItems] = useState([{ description: '', quantity: 1, price: 0 }]);

    useEffect(() => {
        console.log("Fetching accounts...");
        fetchAccounts();
    }, []);

    const [formData, setFormData] = useState({
        account: initialData?.account || invoiceQuotation?.account || '',
        date: new Date(),
        description: initialData?.description || invoiceQuotation?.description || '',
        source: initialData?.source || invoiceQuotation?.customerName || '',
        amount: initialData?.amount || invoiceQuotation?.total || '',
        type: initialData?.type || 'Income',
        status: initialData?.status || 'Pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating field: ${name} to value: ${value}`);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);

        // Calculate new balance based on transaction type
        const selectedAccount = accounts.find(account => account._id === formData.account);
        const currentBalance = selectedAccount ? selectedAccount.balance : 0;
        let newBalance;
    
        if (formData.type === 'Income') {
            newBalance = currentBalance + Number(formData.amount); // Add to balance
            console.log(`Calculating new balance for Income. Current balance: ${currentBalance}, Amount: ${formData.amount}, New balance: ${newBalance}`);
        } else {
            newBalance = currentBalance - Number(formData.amount); // Subtract from balance
            console.log(`Calculating new balance for Expense. Current balance: ${currentBalance}, Amount: ${formData.amount}, New balance: ${newBalance}`);
        }
    
        // Update the account balance
        console.log(`Updating account ID: ${formData.account} with new balance: ${newBalance}`);
        updateAccountByID(formData.account, { balance: newBalance }, formData.type); // Pass transactionType
    
        if (formType === 'Invoice' || formType === 'Quotation') {
            const totalAmount = invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
            console.log(`Submitting invoice data with total amount: ${totalAmount}`);
            onSubmit({ ...formData, amount: totalAmount, items: invoiceItems });
        } else {
            console.log("Submitting transaction data:", formData);
            onSubmit(formData);
        }
    };

    const handleCreateAccount = (accountData) => {
        console.log("Creating new account:", accountData);
        setShowAccountForm(false);
        fetchAccounts();
    };

    const [showAccountForm, setShowAccountForm] = useState(false);

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
            <div className="form-group">
                <button type="button" onClick={() => setShowAccountForm(true)} className="btn-create-account">
                    + Create New Account
                </button>
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
            </div>

            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
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
                    <option value="Received">Received</option>
                    <option value="Paid">Paid</option>
                </select>
            </div>

            <button type="submit" className="btn-submit">Save {formType}</button>
        </form>
    );
}
