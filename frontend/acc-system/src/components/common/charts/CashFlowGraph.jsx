import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTransactions } from '../context/transactionContext';

const CashFlowChart = () => {
  const { transactions } = useTransactions();
  const [chartData, setChartData] = useState({
    series: [
      { name: 'Operating Cash Flow', data: [] },
      { name: 'Free Cash Flow', data: [] },
    ],
    options: {
      chart: {
        type: 'line',
      },
      xaxis: {
        categories: [], // Months or dates
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Cash Flow Analysis',
        align: 'left',
      },
    },
  });

  useEffect(() => {
    const categories = ['January', 'February', 'March']; // Replace with dynamic dates or months
    const operatingCashFlow = categories.map((month) => {
      const income = transactions
        .filter((t) => t.type === 'income' && t.date.includes(month))
        .reduce((acc, curr) => acc + curr.amount, 0);
      const expenses = transactions
        .filter((t) => t.type === 'expense' && t.date.includes(month))
        .reduce((acc, curr) => acc + curr.amount, 0);
      return income - expenses;
    });

    // Assume free cash flow is the operating cash flow minus some capital expenditures
    const freeCashFlow = operatingCashFlow.map((ocf) => ocf - 500); // Placeholder for capital expenditures

    setChartData({
      ...chartData,
      series: [
        { name: 'Operating Cash Flow', data: operatingCashFlow },
        { name: 'Free Cash Flow', data: freeCashFlow },
      ],
      options: {
        ...chartData.options,
        xaxis: { categories },
      },
    });
  }, [transactions]);

  return <Chart options={chartData.options} series={chartData.series} type="line" />;
};

export default CashFlowChart;
