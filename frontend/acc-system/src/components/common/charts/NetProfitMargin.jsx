import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTransactions } from '../../../context/transactionContext';

const NetProfitMarginChart = () => {
  const { transactions } = useTransactions();
  const [chartData, setChartData] = useState({
    series: [{ name: 'Net Profit Margin', data: [] }],
    options: {
      chart: {
        type: 'line',
      },
      xaxis: {
        categories: [], // Months or dates
      },
      yaxis: {
        labels: {
          formatter: (value) => `${value.toFixed(2)}%`,
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Net Profit Margin Over Time',
        align: 'left',
      },
    },
  });

  useEffect(() => {
    const categories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Replace with dynamic dates or months
    const netProfitMargin = categories.map((month) => {
      const revenue = transactions
        .filter((t) => t.type === 'income' && t.date.includes(month))
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expenses = transactions
        .filter((t) => t.type === 'expense' && t.date.includes(month))
        .reduce((acc, curr) => acc + curr.amount, 0);
      const netProfit = revenue - expenses;
      return revenue > 0 ? (netProfit / revenue) * 100 : 0;
    });

    setChartData({
      ...chartData,
      series: [{ name: 'Net Profit Margin', data: netProfitMargin }],
      options: {
        ...chartData.options,
        xaxis: { categories },
      },
    });
  }, [transactions]);

  return <Chart options={chartData.options} series={chartData.series} type="line" />;
};

export default NetProfitMarginChart;
