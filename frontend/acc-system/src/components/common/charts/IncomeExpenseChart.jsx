import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './ChartStyles.css';
import { useTransactions } from '../../../context/transactionContext';

export default function IncVsExpCharts() {
    const { transactions, fetchAllTransactions } = useTransactions();
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [dates, setDates] = useState([Date.now()]);

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    useEffect(() => {
        // Group transactions by date
        const groupedTransactions = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date).toLocaleDateString(); // Format date
            if (!acc[date]) acc[date] = { income: 0, expense: 0 };

            if (transaction.type === 'Income') {
                acc[date].income += transaction.amount;
            } else if (transaction.type === 'Expense') {
                acc[date].expense += transaction.amount;
            }

            return acc;
        }, {});

        // Extract dates, income, and expense arrays
        const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(a) - new Date(b));
        const incomeArray = sortedDates.map((date) => groupedTransactions[date].income);
        const expenseArray = sortedDates.map((date) => groupedTransactions[date].expense);

        setIncomeData(incomeArray);
        setExpenseData(expenseArray);
        setDates(sortedDates);
    }, []);

    // Prepare chart data for line chart
    const chartData = {
        series: [{
            name: 'Income',
            data: incomeData,
        }, {
            name: 'Expenses',
            data: expenseData,
        }],
        options: {
            chart: {
                type: 'line',
                height: 350,
            },
            xaxis: {
                categories: dates,
                title: {
                    text: 'Date',
                },
            },
            yaxis: {
                title: {
                    text: 'Amount (R)',
                },
            },
            stroke: {
                curve: 'smooth',
            },
            markers: {
                size: 4,
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                y: {
                    formatter: (val) => `R ${val}`,
                },
            },
            colors: ['#00E396', '#FF4560'],
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="income-expense-chart">
            <h3>Income vs. Expenses Over Time</h3>
            <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
    );
}
