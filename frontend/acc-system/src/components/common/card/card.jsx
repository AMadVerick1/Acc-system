import React from 'react';
import './card.css';

const Card = ({ title, value, icon, backgroundColor }) => {
    return (
        <div className="card" style={{ backgroundColor }}>
            <div className="card-icon">
                {icon}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-value">{value}</p>
            </div>
        </div>
    );
};

const Cards = () => {
    return (
        <div className="cards-container">
            <Card
                title="Total Income"
                value="R50,000"
                icon={<i className="fas fa-wallet"></i>}
                backgroundColor="rgba(76, 175, 80, 0.2)"
            />
            <Card
                title="Total Expenses"
                value="R30,000"
                icon={<i className="fas fa-money-bill-wave"></i>}
                backgroundColor="rgba(244, 67, 54, 0.2)"
            />
            <Card
                title="Net Profit"
                value="R20,000"
                icon={<i className="fas fa-chart-line"></i>}
                backgroundColor="rgba(33, 150, 243, 0.2)"
            />
            <Card
                title="Outstanding Invoices"
                value="R10,000"
                icon={<i className="fas fa-file-invoice-dollar"></i>}
                backgroundColor="rgba(255, 193, 7, 0.2)"
            />
        </div>
    );
};

export default Cards;
