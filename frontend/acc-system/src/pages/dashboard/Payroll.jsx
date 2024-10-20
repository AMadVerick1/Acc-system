import './styles.css';
import { useState } from 'react';

export default function Payroll() {
    const [activeTab, setActiveTab] = useState('employee-list'); // Default tab is 'employee-list'

    const renderContent = () => {
        switch (activeTab) {
            case 'employee-list':
                return <EmployeeList />;
            case 'salary-management':
                return <SalaryManagement />;
            case 'deductions-benefits':
                return <DeductionsBenefits />;
            case 'tax-calculations':
                return <TaxCalculations />;
            case 'payslip-generation':
                return <PayslipGeneration />;
            default:
                return <EmployeeList />;
        }
    };

    return (
        <div className="payroll-dashboard">
            {/* Sidebar Navigation for Payroll Actions */}
            <div className="col-1">
                <h3 className="heading">Payroll Actions:</h3>
                <div className="action-list">
                    <ul>
                        <li className={`list-item ${activeTab === 'employee-list' ? 'active' : ''}`} onClick={() => setActiveTab('employee-list')}>Employee List</li>
                        <li className={`list-item ${activeTab === 'salary-management' ? 'active' : ''}`} onClick={() => setActiveTab('salary-management')}>Salary Management</li>
                        <li className={`list-item ${activeTab === 'deductions-benefits' ? 'active' : ''}`} onClick={() => setActiveTab('deductions-benefits')}>Deductions & Benefits</li>
                        <li className={`list-item ${activeTab === 'tax-calculations' ? 'active' : ''}`} onClick={() => setActiveTab('tax-calculations')}>Tax Calculations</li>
                        <li className={`list-item ${activeTab === 'payslip-generation' ? 'active' : ''}`} onClick={() => setActiveTab('payslip-generation')}>Payslip Generation</li>
                    </ul>
                </div>
            </div>

            {/* Main Content for Payroll Management */}
            <div className="col-2">
                <div className="payroll-section">
                    <h3 className="heading">{activeTab.replace('-', ' ').toUpperCase()}</h3>
                    <div className="payroll-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Components for each action tab

function EmployeeList() {
    return (
        <div className="employee-table">

            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Net Pay</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder rows */}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function SalaryManagement() {
    return (
        <div className="salary-management">
            <h3>Manage Salaries</h3>

            <div className="salary-table">
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Current Salary</th>
                            <th>Pay Grade</th>
                            <th>Pay Schedule</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="edit-button">Edit</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DeductionsBenefits() {
    return (
        <div className="deductions-benefits">
            <h3>Deductions & Benefits</h3>

            <div className="deductions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Deductions</th>
                            <th>Benefits</th>
                            <th>Net Pay Adjustments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="edit-button">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TaxCalculations() {
    return (
        <div className="tax-calculations">
            <h3>Tax Calculations</h3>

            <div className="tax-table">
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Gross Salary</th>
                            <th>Taxable Amount</th>
                            <th>Tax Rate</th>
                            <th>Tax Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PayslipGeneration() {
    return (
        <div className="payslip-generation">
            <h3>Generate Payslips</h3>

            <div className="payslip-table">
                <table>
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Role</th>
                            <th>Net Pay</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="generate-button">Generate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
