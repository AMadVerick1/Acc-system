import { useTransactions } from "../../../context/transactionContext";
import { useEffect, useState } from "react";
import './metrics.css';

export default function ExpenseReports() {
    const { transactions } = useTransactions();
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const expenseTransactions = transactions.filter(t => t.type === 'expense');
        
        // Calculate total expenses
        const total = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
        setTotalExpenses(total);

        // Group expenses by category
        const expensesByCategory = expenseTransactions.reduce((acc, t) => {
            if (!acc[t.source]) {
                acc[t.source] = 0;
            }
            acc[t.source] += t.amount;
            return acc;
        }, {});

        // Convert the grouped data into an array for easier rendering
        const expenseArray = Object.keys(expensesByCategory).map(category => ({
            category,
            amount: expensesByCategory[category],
            percentage: ((expensesByCategory[category] / total) * 100).toFixed(2),
        }));

        setExpenseData(expenseArray);
    }, [transactions]);

    return (
        <div className="report-detail">
            <h4>Expense Reports</h4>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Percentage of Total Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseData.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.category}</td>
                            <td>R{expense.amount}</td>
                            <td>{expense.percentage}%</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>R{totalExpenses}</strong></td>
                        <td><strong>100%</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
