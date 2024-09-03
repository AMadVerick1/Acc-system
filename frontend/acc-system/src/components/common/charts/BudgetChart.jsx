import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function BudgetChart() {
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: ['Marketing', 'Office Supplies', 'Salaries', 'Utilities', 'Miscellaneous'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };

    const chartSeries = [5000, 3000, 2000, 1500, 1000]; // Example amounts for each category

    return (
        <div className="budget-chart">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={350}
            />
        </div>
    );
}
