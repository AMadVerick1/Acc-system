import { useTransactions } from "../../../context/transactionContext";
import ExportOptions from "../export/ExportOptions";
import { useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import './metrics.css';

export default function SalesRevenueAnalysis() {
    const { transactions } = useTransactions();
    const [salesData, setSalesData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [dates, setDates] = useState([]);
    const [exportData, setExportData] = useState([]); // For export

    useEffect(() => {
        const sales = {};
        const revenue = {};

        transactions.forEach(t => {
            const date = new Date(t.date).toLocaleDateString();
            if (!sales[date]) sales[date] = 0;
            if (!revenue[date]) revenue[date] = 0;

            if (t.type === 'income') {
                sales[date] += t.amount;
                revenue[date] += t.amount;
            } else if (t.type === 'expense') {
                sales[date] -= t.amount;
            }
        });

        setDates(Object.keys(sales));
        setSalesData(Object.values(sales));
        setRevenueData(Object.values(revenue));

        // Prepare data for export
        const exportFormattedData = Object.keys(sales).map(date => ({
            Date: date,
            Sales: sales[date],
            Revenue: revenue[date]
        }));
        setExportData(exportFormattedData);

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
            <ExportOptions data={exportData} /> {/* Include export options */}
        </div>
    );
}
