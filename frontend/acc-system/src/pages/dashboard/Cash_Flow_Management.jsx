import React, { useState, useEffect } from 'react';
import AllTransactions from '../../components/common/transactions_list/AllTransactions.jsx';
import IncomeTransactions from '../../components/common/transactions_list/IncomeTransactions.jsx';
import ExpenseTransactions from '../../components/common/transactions_list/ExpenseTransactions.jsx';
import TransactionFormModal from '../../components/common/modals/TransactionsModal.jsx';

// function calculateBalance(transactions) {
//     let balance = 0;

//     transactions.forEach((transaction) => {
//         if (transaction.type === 'income') {
//             balance += transaction.amount;
//         } else if (transaction.type === 'expense') {
//             balance -= transaction.amount;
//         }
//     });

//     return balance;
// } 

// function calculateIncome(transactions) {
//     let income = 0;

//     transactions.forEach((transaction) => {
//         if (transaction.type === 'income') {
//             income += transaction.amount;
//         }
//     });

//     return income;
// }

// function calculateExpense(transactions) {
//     let expense = 0;
    
//     transactions.forEach((transaction) => {
//         if (transaction.type === 'expense') {
//             expense += transaction.amount;
//         }
//     });

//     return expense;
// }

// function calculateTotal(transactions) {
//     let total = 0;
    
//     transactions.forEach((transaction) => {
//         total += transaction.amount;
//     });

//     return total;
// }

// function calculateNetProfit(transactions) {
//     let netProfit = 0;
    
//     transactions.forEach((transaction) => {
//         if (transaction.type === 'income') {
//             netProfit += transaction.amount;
//         } else if (transaction.type === 'expense') {
//             netProfit -= transaction.amount;
//         }
//     });

//     return netProfit;
// }

// function calculateNetLoss(transactions) {
//     let netLoss = 0;
    
//     transactions.forEach((transaction) => {
//         if (transaction.type === 'income') {
//             netLoss -= transaction.amount;
//         } else if (transaction.type === 'expense') {
//             netLoss += transaction.amount;
//         }
//     });

//     return netLoss;
// }



export default function CashFlow() {
    const [transactions, setTransactions] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [transactionsView, setTransactionsView] = useState('all');

    useEffect(() => {
        // Load transactions from localStorage on component mount
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);

    useEffect(() => {
        // Save transactions to localStorage whenever transactions state changes
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (newTransaction) => {
        if (editingTransaction) {
            // Update existing transaction
            setTransactions(transactions.map(t =>
                t.date === editingTransaction.date && t.description === editingTransaction.description
                    ? { ...newTransaction }
                    : t
            ));
        } else {
            // Add new transaction
            setTransactions([...transactions, newTransaction]);
        }
        setEditingTransaction(null); // Clear editing transaction after saving
    };

    const handleTabClick = (tab) => {
        setTransactionsView(tab);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setModalIsOpen(true);
    };

    const renderContent = () => {
        switch (transactionsView) {
            case 'all':
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
            case 'income':
                return <IncomeTransactions transactions={transactions.filter((t) => t.type === 'income')} onEdit={handleEditClick} />;
            case 'expense':
                return <ExpenseTransactions transactions={transactions.filter((t) => t.type === 'expense')} onEdit={handleEditClick} />;
            default:
                return <AllTransactions transactions={transactions} onEdit={handleEditClick} />;
        }
    };

    return (
        <div className="cashflow-dashboard">
            <h1 className="csf-heading">Cash Flow Management</h1>
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
                        onClose={() => setModalIsOpen(false)}
                        onSubmit={addTransaction}
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
