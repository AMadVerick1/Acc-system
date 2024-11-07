import './styles.css';
import ApexCharts from 'apexcharts';
import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/budgetContext';
import { useAccounts } from '../../context/accountContext';
import { useTransactions } from '../../context/transactionContext';
import { useTotalBalance, useIncomeVsExpenses, useNetWorth, useSavingsRate } from '../../services/kpiService';
import Insights from '../../components/common/metrics/Insights';


export default function Dashboard() {

    

    return (
        <div className="dashboard">
            {/* <div className="sid"></div> */}
            <div className="main-content">
                <div className="budget-container">
                    <h1 className="heading-budget">Overview</h1>
                    <div className="col-1">
                        <div className="row1">
                            
                        </div>

                        <div className="row2">
                            <div className="expense-breakdown"></div>
                            <div className="income-breakdown"></div>
                            <div className="balance-breakdown"></div>
                        </div>

                        <div className="row3">
                            <div className="insights"> 
                                {/* <Insights /> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="alerts">
                            {/* alerts information retrieved from categories in budget */}
                        </div>
                        <div className="accounts-card">
                            {/* {accounts.map((account) => (
                                <div key={account._id} className="account-item">
                                    <h4>{account.name}</h4>
                                    <p>Balance: {account.balance}</p>
                                </div>
                            ))} */}
                        </div>
                        <div className="transaction-history">
                            <div className="transaction-details">
                                {/* {transactions.map((transaction) => (
                                    <div key={transaction._id}>
                                        <p>{transaction.description} ({transaction.type})</p>
                                    </div>
                                ))} */}
                            </div>
                            <div className="transaction-amount">
                                {/* {transactions.map((transaction) => (
                                    <div key={transaction._id}>
                                        <p>{transaction.amount}</p>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
