import { useTransactions } from "../../../context/transactionContext";
import { useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import './metrics.css';

export default function SalesRevenueAnalysis() {
    const { transactions } = useTransactions();
    const [salesData, setSalesData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Group transactions by date and calculate sales and revenue for each date
        const sales = {};
        const revenue = {};

        transactions.forEach(t => {
            const date = new Date(t.date).toLocaleDateString();
            if (!sales[date]) sales[date] = 0;
            if (!revenue[date]) revenue[date] = 0;

            // Assuming 'income' is revenue, and 'expense' reduces sales
            if (t.type === 'income') {
                sales[date] += t.amount;
                revenue[date] += t.amount; // Here revenue could be calculated differently if needed
            } else if (t.type === 'expense') {
                sales[date] -= t.amount; // Assuming sales could be affected by expenses
            }
        });

        setDates(Object.keys(sales));
        setSalesData(Object.values(sales));
        setRevenueData(Object.values(revenue));

        // Create chart
        const chart = new ApexCharts(document.querySelector("#chart-sales-revenue-analysis"), {
            chart: {
                type: 'line',
                height: 350
            },
            series: [{
                name: 'Sales',
                data: Object.values(sales)
            }, {
                name: 'Revenue',
                data: Object.values(revenue)
            }],
            xaxis: {
                categories: Object.keys(sales),
                title: {
                    text: 'Date'
                }
            },
            yaxis: {
                title: {
                    text: 'Amount (R)'
                }
            },
            title: {
                text: 'Sales & Revenue Over Time',
                align: 'center'
            },
            colors: ['#00E396', '#008FFB']
        });

        chart.render();

        // Cleanup the chart when component unmounts
        return () => {
            chart.destroy();
        };
    }, [transactions]);

    return (
        <div className="chart-container">
            <h4>Sales and Revenue Analysis</h4>
            <div className="chart">
                <p>Graphical representation of sales trends, revenue growth, and comparisons across periods.</p>
                <div id="chart-sales-revenue-analysis"></div>
            </div>
        </div>
    );
}
