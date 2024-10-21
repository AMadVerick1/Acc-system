import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './ChartStyles.css';
import { useTransactions } from '../../../context/transactionContext';
import ExportOptions from '../export/ExportOptions'; // Import ExportOptions component

export default function IncVsExpCharts() {
    const { transactions, fetchAllTransactions } = useTransactions();
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [dates, setDates] = useState([Date.now()]);

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    useEffect(() => {
        const groupedTransactions = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date).toLocaleDateString();
            if (!acc[date]) acc[date] = { income: 0, expense: 0 };

            if (transaction.type === 'Income') {
                acc[date].income += transaction.amount;
            } else if (transaction.type === 'Expense') {
                acc[date].expense += transaction.amount;
            }

            return acc;
        }, {});

        const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(a) - new Date(b));
        const incomeArray = sortedDates.map((date) => groupedTransactions[date].income);
        const expenseArray = sortedDates.map((date) => groupedTransactions[date].expense);

        setIncomeData(incomeArray);
        setExpenseData(expenseArray);
        setDates(sortedDates);
    }, [transactions]);

    const chartData = {
        series: [{ name: 'Income', data: incomeData }, { name: 'Expenses', data: expenseData }],
        options: { /* chart options */ },
    };

    // Prepare data for exporting
    const exportData = dates.map((date, index) => ({
        Date: date,
        Income: incomeData[index],
        Expenses: expenseData[index],
    }));

    return (
        <div className="income-expense-chart">
            <h3>Income vs. Expenses Over Time</h3>
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
            <ExportOptions data={exportData} /> {/* Pass export data here */}
        </div>
    );
}
