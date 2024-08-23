import React from 'react';
import Chart from 'react-apexcharts';
import './ChartStyles.css';

export default function IncVsExpCharts({ transactions }) {
    const chartData = {
        series: [{
            name: 'Income',
            data: [4000, 4500, 5000, 4800, 5200]
        }, {
            name: 'Expenses',
            data: [2000, 2500, 3000, 2900, 3100]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: (val) => `$ ${val}`
                }
            }
        },
    };

    return (
        <div className="income-expense-chart">
            <h3>Income vs. Expenses</h3>
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
}