import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import { useBudget } from '../../../context/budgetContext';
import AccountForm from './accountsForm';
import BudgetItemsForm from './BudgetItems';
import './tr_style.css';
// import { set } from 'mongoose';

export default function TransactionForm({ onSubmit, initialData, invoiceQuotation }) {
    const { accounts, fetchAccounts, updateAccountById } = useAccounts();
    const { budgetItems, fetchBudgetOverview, editBudgetItem } = useBudget([]);
    const [formType, setFormType] = useState('Transaction');
    const [invoiceItems, setInvoiceItems] = useState([{ description: '', quantity: 1, price: 0 }]);
    const [selectedBudget, setSelectedBudget] = useState(''); // Selected budget ID
    const [selectedCategory, setSelectedCategory] = useState(''); // Selected category within the budget

    // Fetch accounts and budget overview on component mount
    useEffect(() => {
        console.log("Fetching accounts...");
        fetchAccounts();
        console.log("Fetching budgets...");
        fetchBudgetOverview(); // Fetch budgets
    }, []);

    // Initialize form data state
    const [formData, setFormData] = useState({
        account: initialData?.account || invoiceQuotation?.account || '',
        date: new Date(),
        description: initialData?.description || invoiceQuotation?.description || '',
        source: initialData?.source || invoiceQuotation?.customerName || '',
        amount: initialData?.amount || invoiceQuotation?.total || '',
        type: initialData?.type || 'Income',
        status: initialData?.status || 'Pending',
        budget: initialData?.budget || '',
        category: initialData?.category || '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating field: ${name} to value: ${value}`);
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
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
        updateAccountById(formData.account, { amount: formData.amount }, formData.type);

        // Update the selected budget category's spentAmount
        const selectedBudgetItem = budgetItems.find(budget => budget._id === formData.budget);
        if (selectedBudgetItem) {
            const updatedCategories = selectedBudgetItem.categories.map(category => {
                if (category.name === formData.category && formData.type === 'Expense') {
                    console.log(`Updating category ${category.name} with spentAmount: ${category.spentAmount} + ${formData.amount}`);
                    return {
                        ...category,
                        spentAmount: category.spentAmount + Number(formData.amount),
                    };
                } else if (category.name === formData.category && formData.type === 'Income') {
                    console.log(`Reducing spentAmount for category ${category.name}: ${category.spentAmount} - ${formData.amount}`);
                    return {
                        ...category,
                        spentAmount: category.spentAmount - Number(formData.amount),
                    };
                }
                return category;
            });

            console.log("Updating budget category:", formData.category, "with new spentAmount", updatedCategories);
            editBudgetItem(formData.budget, { categories: updatedCategories });
        }

        // Handle form submission for Invoice or Quotation
        if (formType === 'Invoice' || formType === 'Quotation') {
            const totalAmount = invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
            console.log(`Submitting invoice data with total amount: ${totalAmount}`);
            onSubmit({ ...formData, amount: totalAmount, items: invoiceItems });
        } else {
            console.log("Submitting transaction data:", formData);
            onSubmit(formData);
        }
    };

    // Handle account creation
    const handleCreateAccount = (accountData) => {
        console.log("Creating new account:", accountData);
        setShowAccountForm(false);
        fetchAccounts();
    };

    const [showAccountForm, setShowAccountForm] = useState(false);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    // Handle the budget form
    const handleCreateBudget = (budgetData) => {
        console.log("Creating new budget item:", budgetData);
        setShowBudgetForm(false);
        fetchBudgetOverview();
    };

    // Render forms for account or budget creation
    if (showBudgetForm) {
        return (
            <div className="account-form-container">
                <h2>Create a New Budget Item</h2>
                <BudgetItemsForm onSubmit={handleCreateBudget} />
                <button onClick={() => setShowBudgetForm(false)} className="btn-back">
                    Back to Transaction Form
                </button>
            </div>
        );
    }

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
            <div className="form-group account">
                <button type="button" onClick={() => setShowAccountForm(true)} className="btn-create-account">
                    + Create New Account
                </button>
                <div className="account-selection">
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
                
            </div>

            <div className="form-group budget">
                <button type="button" onClick={() => setShowBudgetForm(true)} className="btn-create-budget">
                    + Create New Budget
                </button>
                <div className="button-selection">
                    <label htmlFor="budget">Budget:</label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => {
                            handleChange(e);
                            setSelectedBudget(e.target.value);
                            setSelectedCategory(''); // Reset category selection when changing budget
                        }}
                        required
                    >
                        <option value="">Select a Budget</option>
                        {budgetItems.map((budgetItem) => (
                            <option key={budgetItem._id} value={budgetItem._id}>
                                {budgetItem.name} - {budgetItem.totalAmount}
                            </option>
                        ))}
                    </select>
                </div>           
            </div>

            {/* Select category within the chosen budget */}
            {selectedBudget && (
                <div className="form-group category">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        {budgetItems
                            .find(budget => budget._id === selectedBudget)?.categories
                            .map((category) => (
                                <option key={category.name} value={category.name}>
                                    {category.name} - Allocated: {category.allocatedAmount}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            <div className="form-group date">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group description">
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

            <div className="form-group source">
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

            <div className="form-group amount">
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

            <div className="form-group type">
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

            <div className="form-group status">
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
