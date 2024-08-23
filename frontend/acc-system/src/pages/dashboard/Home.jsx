import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import './styles.css'; // Import the CSS file
import Cards from '../../components/common/card/card.jsx'; 
import AllTransactions from '../../components/common/transactions_list/AllTransactions.jsx';
import IncomeTransactions from '../../components/common/transactions_list/IncomeTransactions.jsx';
import ExpenseTransactions from '../../components/common/transactions_list/ExpenseTransactions.jsx';

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);

    const [transactionsView, setTransactionsView] = useState('all');

    useEffect(() => {
        // Load transactions from localStorage on component mount
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);

    const renderContent = () => {
        switch (transactionsView) {
            case 'all':
                return <AllTransactions transactions={transactions} />;
            case 'income':
                return <IncomeTransactions transactions={transactions.filter((t) => t.type === 'income')} />;
            case 'expense':
                return <ExpenseTransactions transactions={transactions.filter((t) => t.type === 'expense')} />;
            default:
                return <AllTransactions transactions={transactions} />;
        }
    };

    useEffect(() => {
        const options = {
            chart: {
                type: 'area',
                stroke: {
                    curve: 'smooth',
                },
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 2,
                    blur: 4,
                    opacity: 0.2,
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                    },
                },
            },
            series: [
                {
                    name: 'Income',
                    data: [10900, 30230, 21000, 40000, 37500],
                    color: '#FF0000',
                },
                {
                    name: 'Expenses',
                    data: [50000, 15750, 25230, 35170, 18930],
                    color: '#00FF00',
                },
            ],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            },
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        // Cleanup the chart on component unmount
        return () => chart.destroy();
    }, []);

    return (
        <div className="dashboard">
            <div className="sid">
                {/* Sidebar icons would go here */}
            </div>
            <div className="main-content">
                <div className="budget-container">
                    <h1 className="heading-budget">Overview</h1>
                    <div className="row1">
                        <div className="info-boxes">
                            <Cards />
                        </div>
                        <div className="chart-container">
                            <div id="chart"></div>
                        </div>
                    </div>
                </div>

                <div className="transactions-container">
                    <h1 className="heading-transactions">Transactions</h1>
                    {/* <TransactionForm onAddTransaction={addTransaction} /> */}
                    <div className="widget">
                        <div className="tabs">
                            <button
                                className={`tab-button ${transactionsView === 'all' ? 'active' : ''}`}
                                onClick={() => setTransactionsView('all')}
                            >
                                All
                            </button>
                            <button
                                className={`tab-button ${transactionsView === 'income' ? 'active' : ''}`}
                                onClick={() => setTransactionsView('income')}
                            >
                                Income
                            </button>
                            <button
                                className={`tab-button ${transactionsView === 'expense' ? 'active' : ''}`}
                                onClick={() => setTransactionsView('expense')}
                            >
                                Expense
                            </button>
                        </div>
                        <div className="tab-content">{renderContent()}</div>
                    </div>
                </div>

                <div className="row3">
                    <div className="section-container">
                        <h3 className="subheading">Taxes</h3>
                        <div className="widget">
                            {/* Tax info would go here */}
                        </div>
                    </div>

                    <div className="section-container">
                        <h3 className="subheading">Payroll</h3>
                        <div className="widget">
                            {/* Payroll info would go here */}
                        </div>
                    </div>

                    <div className="section-container">
                        <h3 className="subheading">Recent</h3>
                        <div className="widget">
                            {/* Recent activity would go here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
