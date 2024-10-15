import React, { useState, useEffect } from 'react';
import AllTransactions from '../../components/common/transactions_list/AllTransactions.jsx';
import IncomeTransactions from '../../components/common/transactions_list/IncomeTransactions.jsx';
import ExpenseTransactions from '../../components/common/transactions_list/ExpenseTransactions.jsx';
import TransactionFormModal from '../../components/common/modals/TransactionsModal.jsx';
import { useTransactions } from '../../context/transactionContext';
import { useAccounts } from '../../context/accountContext';
import Cards from '../../components/common/card/cards'; 

export default function CashFlow() {
    const { transactions, fetchAllTransactions, addTransaction, editTransaction, error, loading } = useTransactions();
    const { fetchAccounts } = useAccounts();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [transactionsView, setTransactionsView] = useState('all');
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netCashFlow, setNetCashFlow] = useState(0);
    const [amountDue, setAmountDue] = useState(0);

    useEffect(() => {
        console.log('Fetching all transactions...');
        fetchAllTransactions();
        fetchAccounts();
    }, []);

    useEffect(() => {
        console.log('Transactions fetched:', transactions);

        const income = transactions.filter(t => t.type === 'Income' && t.status === 'Received').reduce((acc, t) => acc + (t.amount || 0), 0);

        const expenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + (t.amount || 0), 0);

        const amountDue = transactions.filter(t => t.type === 'Income' && t.status === 'Pending').reduce((acc, t) => acc + (t.amount || 0), 0);

        console.log('Income:', income);
        console.log('Expenses:', expenses);
        console.log('Amount Due:', amountDue);

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setAmountDue(amountDue);
        setNetCashFlow(income - expenses);
    }, [transactions]); // Added transactions dependency

    const handleTabClick = (tab) => {
        console.log(`Switching to ${tab} view`);
        setTransactionsView(tab);
    };

    const handleEditClick = (transaction) => {
        console.log('Editing transaction:', transaction);
        setEditingTransaction(transaction);
        setModalIsOpen(true);
    };

    const handleSubmit = (transactionData) => {
        console.log('Submitting transaction from CashFlow:', transactionData);
        if (editingTransaction) {
            editTransaction(editingTransaction._id, transactionData);  // Ensure you pass the correct ID for editing
        } else {
            addTransaction(transactionData);
        }
        setModalIsOpen(false);
        setEditingTransaction(null);
    };

    const handleCloseModal = () => {
        console.log('Closing modal');
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
            console.log('Loading transactions...');
            return <p>Loading transactions...</p>;
        }

        if (error) {
            console.error('Error fetching transactions:', error);
            return <p>Error: {error}</p>;
        }

        switch (transactionsView) {
            case 'all':
                console.log('Displaying all transactions');
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
            case 'income':
                console.log('Displaying income transactions');
                return <IncomeTransactions transactions={transactions.filter((t) => t.type.toLowerCase() === 'income')} onEdit={handleEditClick} />;
            case 'expense':
                console.log('Displaying expense transactions');
                return <ExpenseTransactions transactions={transactions.filter((t) => t.type.toLowerCase() === 'expense')} onEdit={handleEditClick} />;
            default:
                console.log('Defaulting to all transactions view');
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
        }
    };

    return (
        <div className="cashflow-dashboard">
            <h1 className="csf-heading">Transactions</h1>

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
                    </div>

                    <div className="btn-add-transaction-container">
                        <button onClick={() => setModalIsOpen(true)} className="btn-add-transaction">
                            Add New Transaction
                        </button>                        
                    </div>

                    <TransactionFormModal
                        isOpen={modalIsOpen}
                        onClose={handleCloseModal}
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
