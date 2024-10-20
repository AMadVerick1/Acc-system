import './styles.css';
import ApexCharts from 'apexcharts';
import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/budgetContext';
import { useAccounts } from '../../context/accountContext';
import { useTransactions } from '../../context/transactionContext';
import { useTotalBalance, useIncomeVsExpenses, useNetWorth, useSavingsRate } from '../../services/kpiService';
import Insights from '../../components/common/metrics/Insights';


export default function Dashboard() {

    const { transactions, fetchAllTransactions } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts();
    const { budget, fetchBudgetOverview } = useBudget();

    useEffect(() => {
        fetchAllTransactions();
        fetchAccounts();
        fetchBudgetOverview();
    }, []);

    const totalBalance = useTotalBalance();
    const netWorth = useNetWorth();
    const savingsRate = useSavingsRate();
    const incomeVsExpenses = useIncomeVsExpenses();

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'Income')
        .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'Expense')
        .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

    const Card = ({ title, amount }) => {
        return (
            <div className="card">
                <div className="card-information">
                    <h3>{title}</h3>
                    <p>{amount}</p>
                </div>
                <div className="card-icon">
                    {/* Optional: Icon related to the metric */}
                </div>
            </div>
        );
    };

    const Cards = ({ metrics }) => {
        return (
            <div className="cards-container">
                {metrics.map((metric, index) => (
                    <Card key={index} title={metric.title} amount={metric.value} />
                ))}
            </div>
        );
    };

    const metrics = [
        { title: 'Total Income', value: totalIncome },
        { title: 'Total Expenses', value: totalExpenses },
        // { title: 'Total Balance', value: totalBalance },
        // { title: 'Net Worth', value: netWorth },
        // { title: 'Savings Rate', value: savingsRate },
        // { title: 'Income vs Expenses', value: incomeVsExpenses },
    ];

    // useEffect(() => {
    //     const options = {
    //         series: [{
    //             name: 'Expenses',
    //             data: transactions.filter(t => t.type === 'expense').map(t => t.amount)
    //         }],
    //         chart: {
    //             type: 'bar',
    //         },
    //         xaxis: {
    //             categories: transactions.filter(t => t.type === 'expense').map(t => t.description),
    //         }
    //     };

    //     const chart = new ApexCharts(document.querySelector(".expense-breakdown"), options);
    //     chart.render();

    //     return () => {
    //         chart.destroy();
    //     };
    // }, [transactions]);


    // useEffect(() => {
    //     const options = {
    //         series: [{
    //             name: 'Income',
    //             data: transactions.filter(t => t.type === 'income').map(t => t.amount)
    //         }],
    //         chart: {
    //             type: 'bar',
    //         },
    //         xaxis: {
    //             categories: transactions.filter(t => t.type === 'income').map(t => t.description),
    //         }
    //     };

    //     const chart = new ApexCharts(document.querySelector(".income-breakdown"), options);
    //     chart.render();

    //     return () => {
    //         chart.destroy();
    //     };
    // }, [transactions]);


    // useEffect(() => {
    //     const options = {
    //         series: [{
    //             name: 'Balance',
    //             data: transactions.map(t => t.amount)
    //         }],
    //         chart: {
    //             type: 'bar',
    //         }  

    //     };

    //     const chart = new ApexCharts(document.querySelector(".balance-breakdown"), options);
    //     chart.render();

    //     return () => {
    //         chart.destroy();
    //     };
    // }, [transactions]);

    return (
        <div className="dashboard">
            <div className="sid">
                {/* Sidebar icons would go here */}
            </div>
            <div className="main-content">
                <div className="budget-container">
                    <h1 className="heading-budget">Overview</h1>
                    <div className="col-1">
                        <div className="row1">
                            <Cards metrics={metrics} />
                        </div>

                        <div className="row2">
                            <div className="expense-breakdown"></div>
                            <div className="income-breakdown"></div>
                            <div className="balance-breakdown"></div>
                        </div>

                        <div className="row3">
                            <div className="insights">
                                {/* <h3>Insights</h3> */}
                                {/* insights information retrieved from budget */}
                                <Insights />
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="alerts">
                            {/* alerts information retrieved from categories in budget */}
                        </div>
                        <div className="accounts-card">
                            {accounts.map((account) => (
                                <div key={account._id} className="account-item">
                                    <h4>{account.name}</h4>
                                    <p>Balance: {account.balance}</p>
                                </div>
                            ))}
                        </div>
                        <div className="transaction-history">
                            <div className="transaction-details">
                                {transactions.map((transaction) => (
                                    <div key={transaction._id}>
                                        <p>{transaction.description} ({transaction.type})</p>
                                    </div>
                                ))}
                            </div>
                            <div className="transaction-amount">
                                {transactions.map((transaction) => (
                                    <div key={transaction._id}>
                                        <p>{transaction.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
