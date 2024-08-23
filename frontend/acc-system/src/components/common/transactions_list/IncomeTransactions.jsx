import React from 'react';
import TransactionsTable from '../tables/TransactionsTable';

function IncomeTransactions({ transactions, onEdit }) {
    const headers = ['Date', 'Description', 'Source', 'Amount', 'Status', 'Actions'];
    const rows = transactions.map(({ date, description, source, amount, status }) => [
        date,
        description,
        source,
        `$${amount}`,
        status,
        <button onClick={() => onEdit({ date, description, source, amount, status })}>Edit</button>
    ]);

    return (
        <div className="income-transactions">
            <TransactionsTable headers={headers} rows={rows} />
        </div>
    );
}

export default IncomeTransactions;
