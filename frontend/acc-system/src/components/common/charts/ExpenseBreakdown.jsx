// import Chart from 'react-apexcharts';
// import React, { useState, useEffect } from 'react';
// import { useTransactions } from '../../../context/transactionContext';

// const ExpenseBreakdownChart = () => {
//   const { transactions } = useTransactions();
//   const [chartData, setChartData] = useState({
//     series: [],
//     options: {
//       chart: {
//         type: 'pie',
//       },
//       labels: [],
//       title: {
//         text: 'Expense Breakdown by Category',
//         align: 'left',
//       },
//     },
//   });

//   useEffect(() => {
//     const categories = ['Rent', 'Utilities', 'Salaries', 'Office Supplies', 'Groceries', 'Other'];
//     const expenseData = categories.map((category) =>
//       transactions
//         .filter((t) => t.type === 'expense' && t.category === category)
//         .reduce((acc, curr) => acc + curr.amount, 0)
//     );

//     setChartData({
//       ...chartData,
//       series: expenseData,
//       options: {
//         ...chartData.options,
//         labels: categories,
//       },
//     });
//   }, [transactions]);

//   return <Chart options={chartData.options} series={chartData.series} type="pie" />;
// };

// export default ExpenseBreakdownChart;

