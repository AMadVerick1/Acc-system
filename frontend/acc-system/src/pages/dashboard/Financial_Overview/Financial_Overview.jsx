// FinancialOverview.jsx
import '../styles.css';
import React, { useState } from 'react';
import BudgetOverview from './BudgetOverview';
import Insights from '../../../components/common/metrics/Insights';
import KeyMetrics from '../../../components/common/metrics/KeyMetrics';
import HealthIndicators from '../../../components/common/metrics/FinancialHealthIndicators';
import RecentTransactionsTable from '../../../components/common/tables/RecentTransactionsTable';
import IncVsExpCharts from '../../../components/common/charts/IncomeExpenseChart';
import ExportOptions from '../../../components/common/export/ExportOptions';
import { getTransactions } from '../../../services/transactionService';
import { useEffect } from 'react';

export default function FinancialOverview() {
    const [activeTab, setActiveTab] = useState('financial');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading...</p>;

    // Render the content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'budget':
                return <BudgetOverview />;
            case 'financial':
                return (
                    <div className="financial-overview-content">
                        <KeyMetrics />
                        <IncVsExpCharts />
                        <RecentTransactionsTable />
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
            {/* Tabs to toggle between Budget and Financial Overview */}
            <div className="tabs">
                <button 
                    className={`tab-button ${activeTab === 'financial' ? 'active' : ''}`}
                    onClick={() => setActiveTab('financial')}
                >
                    Financial Overview
                </button>                
                <button 
                    className={`tab-button ${activeTab === 'budget' ? 'active' : ''}`}
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
