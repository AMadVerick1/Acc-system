import { useTransactions } from "../../../context/transactionContext";
import { useEffect, useState } from "react";
import './metrics.css';

export default function IncomeStatements() {
    const { transactions } = useTransactions();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [costOfGoodsSold, setCostOfGoodsSold] = useState(0);
    const [grossProfit, setGrossProfit] = useState(0);
    const [operatingExpenses, setOperatingExpenses] = useState(0);
    const [netIncome, setNetIncome] = useState(0);

    useEffect(() => {
        const totalIncome = transactions
            .filter(t => t.type.toLowerCase() === 'income')
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        const cogs = transactions
            .filter(t => t.type.toLowerCase() === 'expense' && t.description.toLowerCase().includes('cogs'))
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        const operatingCosts = transactions
            .filter(t => t.type.toLowerCase() === 'expense' && !t.description.toLowerCase().includes('cogs'))
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        const grossProfitCalc = totalIncome - cogs;
        const netIncomeCalc = grossProfitCalc - operatingCosts;

        setTotalRevenue(totalIncome);
        setCostOfGoodsSold(cogs);
        setGrossProfit(grossProfitCalc);
        setOperatingExpenses(operatingCosts);
        setNetIncome(netIncomeCalc);
    }, [transactions]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="report-detail">
            <h4>Income Statements</h4>
            <table>
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Total Revenue</th>
                        <th>Cost of Goods Sold</th>
                        <th>Gross Profit</th>
                        <th>Operating Expenses</th>
                        <th>Net Income</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentDate.toLocaleDateString()}</td>
                        <td>R{totalRevenue}</td>
                        <td>R{costOfGoodsSold}</td>
                        <td>R{grossProfit}</td>
                        <td>R{operatingExpenses}</td>
                        <td>R{netIncome}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
