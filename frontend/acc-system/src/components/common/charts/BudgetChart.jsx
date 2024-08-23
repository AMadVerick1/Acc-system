import React from 'react';
import Chart from 'react-apexcharts';

export default function BudgetBreakdownChart({ items }) {
    const categories = items.map(item => item.category);
    const plannedAmounts = items.map(item => item.planned);
    const actualAmounts = items.map(item => item.actual);

    const chartData = {
        series: [
            {
                name: 'Planned',
                data: plannedAmounts
            },
            {
                name: 'Actual',
                data: actualAmounts
            }
        ],
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
            xaxis: {
                categories,
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
        }
    };

    return (
        <div className="budget-breakdown-chart">
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
}
