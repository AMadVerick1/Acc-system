import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function CashFlowGraph() {
    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June'],
        },
        colors: ['#00E396'], // Cash flow color
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 5,
        },
    };

    const chartSeries = [
        {
            name: 'Cash Flow',
            data: [1500, 2500, 2000, 3000, 4000, 3500], // Example cash flow data
        },
    ];

    return (
        <div className="cashflow-graph">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
            />
        </div>
    );
}
