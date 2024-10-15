import { useTransactions } from "../../../context/transactionContext";
import { useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import './metrics.css';

export default function OverallSummary() {
    const { transactions } = useTransactions();
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netProfit, setNetProfit] = useState(0);

    useEffect(() => {
        // Calculate total income and expenses
        const income = transactions
            .filter(t => t.type.toLowerCase() === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type.toLowerCase() === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setNetProfit(income - expenses);

        // Prepare chart data
        const options = {
            chart: {
                type: 'bar',
                height: 350
            },
            series: [{
                name: 'Amount',
                data: [income, expenses, income - expenses]
            }],
            xaxis: {
                categories: ['Total Income', 'Total Expenses', 'Net Profit/Loss']
            },
            colors: ['#28a745', '#dc3545', '#007bff'],
            dataLabels: {
                enabled: true,
                formatter: (val) => `R${val.toFixed(2)}`
            }
        };

        // Render chart
        const chart = new ApexCharts(document.querySelector("#chart-overall-summary"), options);
        chart.render();

        return () => {
            chart.destroy(); // Cleanup the chart on component unmount
        };
    }, [transactions]);

    return (
        <div className="chart-container">
            <h4>Financial Overview</h4>
            <div className="chart">
                <p>Graphical representation of total income, expenses, and net profit/loss.</p>
                <div id="chart-overall-summary"></div>
            </div>
        </div>
    );
}
