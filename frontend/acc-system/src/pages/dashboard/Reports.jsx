import './styles.css';
import { useState } from 'react';
import { useBudget } from '../../context/budgetContext';
import { useAccounts } from '../../context/accountContext';
import { useTransactions } from '../../context/transactionContext';
import { useTotalBalance, useIncomeVsExpenses, useNetWorth, useSavingsRate } from '../../services/kpiService';
import ExpenseReports from '../../components/common/metrics/ExpenseReports';
import OverallSummary from '../../components/common/metrics/OverallSummary';
import IncomeStatements from '../../components/common/metrics/IncomeStatements';
import CashFlowStatements from '../../components/common/metrics/CashFlowStatements';
import SalesRevenueAnalysis from '../../components/common/metrics/SalesRevenueAnalysis';

export default function Reports() {
    const [activeView, setActiveView] = useState('overall-summary');

    const renderContent = () => {
        switch (activeView) {
            case 'overall-summary':
                return <OverallSummary />;
            case 'income-statements':
                return <IncomeStatements />;
            case 'cash-flow-statements':
                return <CashFlowStatements />;
            case 'sales-revenue-analysis':
                return <SalesRevenueAnalysis />;
            // case 'expense-reports':
            //     return <ExpenseReports />;
            default:
                return <OverallSummary />;
        }
    };

    return (
        <div className="reports-dashboard">

            <div className="col-1">
                <h3 className="heading">View:</h3>
                <div className="view-list">
                    <ul>
                        <li className={`list-item ${activeView === 'overall-summary' ? 'active' : ''}`} onClick={() => setActiveView('overall-summary')}>Overall Summary</li>
                        <li className={`list-item ${activeView === 'income-statements' ? 'active' : ''}`} onClick={() => setActiveView('income-statements')}>Income Statements</li>
                        <li className={`list-item ${activeView === 'cash-flow-statements' ? 'active' : ''}`} onClick={() => setActiveView('cash-flow-statements')}>Cash Flow Statements</li>
                        <li className={`list-item ${activeView === 'sales-revenue-analysis' ? 'active' : ''}`} onClick={() => setActiveView('sales-revenue-analysis')}>Sales and Revenue Analysis</li>
                        {/* <li className={`list-item ${activeView === 'expense-reports' ? 'active' : ''}`} onClick={() => setActiveView('expense-reports')}>Expense Reports</li> */}
                        {/* <li className={`list-item ${activeView === 'vat-reports' ? 'active' : ''}`} onClick={() => setActiveView('vat-reports')}>VAT Reports</li> */}
                    </ul>
                </div>
            </div>

            {/* Main Content for Report Display */}
            <div className="col-2">
                <div className="report-section">
                    <h3 className="heading">{activeView.replace('-', ' ').toUpperCase(  )}</h3>
                    <div className="report-content">
                        {renderContent()}
                    </div>

                    <div className="report-actions">
                        <button className="export-button">Download as PDF</button>
                        <button className="export-button">Export to Excel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Components for each report view

