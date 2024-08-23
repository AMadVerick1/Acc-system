import React from 'react';

export default function HealthIndicators() {
    const currentRatio = 1.5; // Placeholder for calculation
    const debtToEquity = 0.4; // Placeholder for calculation

    return (
        <div className="health-indicators">
            <div className="indicator-card">
                <h3>Current Ratio</h3>
                <p>{currentRatio}</p>
            </div>
            <div className="indicator-card">
                <h3>Debt-to-Equity Ratio</h3>
                <p>{debtToEquity}</p>
            </div>
        </div>
    );
}
