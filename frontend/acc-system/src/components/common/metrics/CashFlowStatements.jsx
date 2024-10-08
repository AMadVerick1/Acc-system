import { useTransactions } from "../../../context/transactionContext";
import { useEffect, useState } from "react";
import './metrics.css';

export default function CashFlowStatements() {
    const { transactions } = useTransactions();
    const [operatingActivities, setOperatingActivities] = useState(0);
    const [investingActivities, setInvestingActivities] = useState(0);
    const [financingActivities, setFinancingActivities] = useState(0);
    const [netCashFlow, setNetCashFlow] = useState(0);

    useEffect(() => {
        // Calculate Cash Flow from Operating Activities
        const operating = transactions
            .filter(t => t.activityType === 'operating')
            .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

        // Calculate Cash Flow from Investing Activities
        const investing = transactions
            .filter(t => t.activityType === 'investing')
            .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

        // Calculate Cash Flow from Financing Activities
        const financing = transactions
            .filter(t => t.activityType === 'financing')
            .reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

        // Calculate Net Cash Flow
        const netCash = operating + investing + financing;

        setOperatingActivities(operating);
        setInvestingActivities(investing);
        setFinancingActivities(financing);
        setNetCashFlow(netCash);
    }, [transactions]);

    return (
        <div className="report-detail">
            <h4>Cash Flow Statements</h4>
            <table>
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>Operating Activities</th>
                        <th>Investing Activities</th>
                        <th>Financing Activities</th>
                        <th>Net Cash Flow</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td> 
                        <td>R{operatingActivities.toFixed(2)}</td>
                        <td>R{investingActivities.toFixed(2)}</td>
                        <td>R{financingActivities.toFixed(2)}</td>
                        <td>R{netCashFlow.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
