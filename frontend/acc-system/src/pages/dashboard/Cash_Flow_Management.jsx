import React, { useState, useEffect } from 'react';
import AllTransactions from '../../components/common/transactions_list/AllTransactions.jsx';
import IncomeTransactions from '../../components/common/transactions_list/IncomeTransactions.jsx';
import ExpenseTransactions from '../../components/common/transactions_list/ExpenseTransactions.jsx';
import TransactionFormModal from '../../components/common/modals/TransactionsModal.jsx';
import { useTransactions } from '../../context/transactionContext';
import { useAccounts } from '../../context/accountContext';
import Cards from '../../components/common/card/cards'; // Import the Cards component

export default function CashFlow() {
    const { transactions, fetchAllTransactions, addTransaction, editTransaction, removeTransaction, error, loading } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [transactionsView, setTransactionsView] = useState('all');

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netCashFlow, setNetCashFlow] = useState(0);
    const [amountDue, setAmountDue] = useState(0);

    useEffect(() => {
        fetchAllTransactions();
        fetchAccounts();
    }, []);

    useEffect(() => {
        const income = transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
        const invoicesDue = transactions.filter(t => t.type === 'Invoice' && t.status === 'Pending').reduce((acc, t) => acc + t.amount, 0);
        
        setTotalIncome(income);
        setTotalExpenses(expenses);
        setAmountDue(invoicesDue);
        setNetCashFlow(income - expenses);
    }, []);

    const handleTabClick = (tab) => {
        setTransactionsView(tab);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setModalIsOpen(true);
    };

    const handleSubmit = (transactionData) => {
        if (editingTransaction) {
            editTransaction(transactionData);
        } else {
            addTransaction(transactionData);
        }
        setModalIsOpen(false);
        setEditingTransaction(null);
    };

    const metrics = [
        { title: 'Total Income', value: `R${totalIncome}` },
        { title: 'Total Expenses', value: `R${totalExpenses}` },
        { title: 'Net Cash Flow', value: `R${netCashFlow}` },
        { title: 'Amount Due', value: `R${amountDue}` }
    ];

    const renderContent = () => {
        if (loading) {
            return <p>Loading transactions...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        switch (transactionsView) {
            case 'all':
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
            case 'income':
                return <IncomeTransactions transactions={transactions.filter((t) => t.type === 'Income')} onEdit={handleEditClick} />;
            case 'expense':
                return <ExpenseTransactions transactions={transactions.filter((t) => t.type === 'Expense')} onEdit={handleEditClick} />;
            case 'invoice':
                return <AllTransactions transactions={transactions.filter((t) => t.type === 'Invoice')} onEdit={handleEditClick} />;
            case 'quotation':
                return <AllTransactions transactions={transactions.filter((t) => t.type === 'Quotation')} onEdit={handleEditClick} />;
            default:
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
        }
    };

    return (
        <div className="cashflow-dashboard">
            <h1 className="csf-heading">Cash Flow Management</h1>

            {/* Financial Metrics Cards */}
            <Cards metrics={metrics} />

            <div className="content-area">
                <div className="row">
                    <div className="tabs">
                        <button
                            className={`tab-button ${transactionsView === 'all' ? 'active' : ''}`}
                            onClick={() => handleTabClick('all')}
                        >
                            All
                        </button>
                        <button
                            className={`tab-button ${transactionsView === 'income' ? 'active' : ''}`}
                            onClick={() => handleTabClick('income')}
                        >
                            Income
                        </button>
                        <button
                            className={`tab-button ${transactionsView === 'expense' ? 'active' : ''}`}
                            onClick={() => handleTabClick('expense')}
                        >
                            Expense
                        </button>
                        <button className={`tab-button ${transactionsView === 'invoice' ? 'active' : ''}`} onClick={() => handleTabClick('invoice')}>
                            Invoices
                        </button>
                        <button className={`tab-button ${transactionsView === 'quotation' ? 'active' : ''}`} onClick={() => handleTabClick('quotation')}>
                            Quotations
                        </button>
                    </div>

                    <div className="btn-add-transaction-container">
                        <button onClick={() => setModalIsOpen(true)} className="btn-add-transaction">
                            Add New Transaction
                        </button>                        
                    </div>

                    <TransactionFormModal
                        isOpen={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        onSubmit={handleSubmit}
                        initialData={editingTransaction}
                    />
                </div>
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
