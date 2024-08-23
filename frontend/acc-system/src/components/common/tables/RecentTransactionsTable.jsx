import React from 'react';

export default function RecentTransactionsTable() {
    const transactions = [
        { date: '10/08/2024', description: 'Payment from Client A', amount: 1200, type: 'income' },
        { date: '12/08/2024', description: 'Office Supplies', amount: 300, type: 'expense' },
        { date: '13/08/2024', description: 'Subscription Service', amount: 50, type: 'expense' },
    ];

    return (
        <div className="recent-transactions-table">
            <h3>Recent Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.amount}</td>
                            <td>{transaction.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
