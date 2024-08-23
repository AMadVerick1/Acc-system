import './styles.css';
import { useState } from 'react';

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
            case 'expense-reports':
                return <ExpenseReports />;
            case 'vat-reports':
                return <VATReports />;
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
                        <li className={`list-item ${activeView === 'expense-reports' ? 'active' : ''}`} onClick={() => setActiveView('expense-reports')}>Expense Reports</li>
                        <li className={`list-item ${activeView === 'vat-reports' ? 'active' : ''}`} onClick={() => setActiveView('vat-reports')}>VAT Reports</li>
                    </ul>
                </div>
            </div>

            {/* Main Content for Report Display */}
            <div className="col-2">
                <div className="report-section">
                    <h3 className="heading">{activeView.replace('-', ' ').toUpperCase()}</h3>
                    <div className="report-content">
                        {renderContent()}
                    </div>

                    {/* Options for Exporting and Downloading Reports */}
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

function OverallSummary() {
    return (
        <div className="chart-container">
            <h4>Financial Overview</h4>
            <div className="chart">
                <p>Graphical representation of total income, expenses, and net profit/loss.</p>
            </div>
        </div>
    );
}

function IncomeStatements() {
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
                        <td>January 2024</td>
                        <td>$50,000</td>
                        <td>$20,000</td>
                        <td>$30,000</td>
                        <td>$10,000</td>
                        <td>$20,000</td>
                    </tr>
                    {/* Additional rows */}
                </tbody>
            </table>
        </div>
    );
}

function CashFlowStatements() {
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
                        <td>January 2024</td>
                        <td>$25,000</td>
                        <td>-$5,000</td>
                        <td>-$3,000</td>
                        <td>$17,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function SalesRevenueAnalysis() {
    return (
        <div className="chart-container">
            <h4>Sales and Revenue Analysis</h4>
            <div className="chart">
                <p>Graphical representation of sales trends, revenue growth, and comparisons across periods.</p>
            </div>
        </div>
    );
}

function ExpenseReports() {
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
                    <tr>
                        <td>Operational Costs</td>
                        <td>$15,000</td>
                        <td>60%</td>
                    </tr>
                    <tr>
                        <td>Administrative Costs</td>
                        <td>$5,000</td>
                        <td>20%</td>
                    </tr>
                    <tr>
                        <td>Miscellaneous</td>
                        <td>$5,000</td>
                        <td>20%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function VATReports() {
    return (
        <div className="report-detail">
            <h4>VAT Reports</h4>
            <table>
                <thead>
                    <tr>
                        <th>Period</th>
                        <th>VAT Collected</th>
                        <th>VAT Paid</th>
                        <th>Net VAT Payable/Refundable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Q1 2024</td>
                        <td>$6,000</td>
                        <td>$3,500</td>
                        <td>$2,500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
