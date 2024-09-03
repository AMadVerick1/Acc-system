// FinancialOverview.jsx
import '../styles.css';
import React, { useState } from 'react';
import BudgetOverview from './BudgetOverview';
import Insights from '../../../components/common/metrics/Insights';
import KeyMetrics from '../../../components/common/metrics/KeyMetrics';
import HealthIndicators from '../../../components/common/metrics/FinancialHealthIndicators';
import IncomeExpenseChart from '../../../components/common/charts/IncomeExpenseChart';
import ExportOptions from '../../../components/common/export/ExportOptions';

export default function FinancialOverview() {
    const [activeTab, setActiveTab] = useState('financial');

    const renderContent = () => {
        switch (activeTab) {
            case 'budget':
                return <BudgetOverview />;
            case 'financial':
                return (
                    <div className="financial-overview-content">
                        <KeyMetrics />
                        <IncomeExpenseChart />
                        <HealthIndicators />
                        <Insights />
                        <ExportOptions />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="financial-overview">
            <div className="tabs">
                <button
                    className={activeTab === 'financial' ? 'active' : ''}
                    onClick={() => setActiveTab('financial')}
                >
                    Financial Overview
                </button>
                <button
                    className={activeTab === 'budget' ? 'active' : ''}
                    onClick={() => setActiveTab('budget')}
                >
                    Budget
                </button>
            </div>

            {/* Main Content */}
            <div className="overview-content">
                {renderContent()}
            </div>
        </div>
    );
}
