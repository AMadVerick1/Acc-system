import { useTransactions } from "../../../context/transactionContext";
import ExportOptions from "../export/ExportOptions";
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
    const [exportData, setExportData] = useState([]); // For export

    useEffect(() => {
        // Calculate Total Revenue
        const totalIncome = transactions
            .filter(t => t.type.toLowerCase() === 'income')
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        // Calculate COGS
        const cogs = transactions
            .filter(t => t.type.toLowerCase() === 'expense' && t.description.toLowerCase().includes('cogs'))
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        // Calculate Operating Costs
        const operatingCosts = transactions
            .filter(t => t.type.toLowerCase() === 'expense' && !t.description.toLowerCase().includes('cogs'))
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        // Gross Profit and Net Income
        const grossProfitCalc = totalIncome - cogs;
        const netIncomeCalc = grossProfitCalc - operatingCosts;

        // Set state values
        setTotalRevenue(totalIncome);
        setCostOfGoodsSold(cogs);
        setGrossProfit(grossProfitCalc);
        setOperatingExpenses(operatingCosts);
        setNetIncome(netIncomeCalc);

        // Prepare data for export
        const exportFormattedData = [{
            Period: currentDate.toLocaleDateString(),
            "Total Revenue": `R${totalIncome.toFixed(2)}`,
            "Cost of Goods Sold": `R${cogs.toFixed(2)}`,
            "Gross Profit": `R${grossProfitCalc.toFixed(2)}`,
            "Operating Expenses": `R${operatingCosts.toFixed(2)}`,
            "Net Income": `R${netIncomeCalc.toFixed(2)}`
        }];
        setExportData(exportFormattedData);
    }, [transactions, currentDate]);

    // Update current time every second
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
                        <td>R{totalRevenue.toFixed(2)}</td>
                        <td>R{costOfGoodsSold.toFixed(2)}</td>
                        <td>R{grossProfit.toFixed(2)}</td>
                        <td>R{operatingExpenses.toFixed(2)}</td>
                        <td>R{netIncome.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Include Export Options for exporting data */}
            <ExportOptions data={exportData} />
        </div>
    );
}
