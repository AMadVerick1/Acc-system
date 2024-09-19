import React from 'react';
import './card.css';

const Card = ({ title, value }) => {
    return (
        <div className="metric-card">
            <div className="card-content">
                <div className="col-1">
                    <div className="card-icon">
                        <p>Icon Placeholder...</p>
                    </div>
                    <div className="card-info">
                        <h3>{title}</h3>
                        <p>{value}</p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="card-chart">
                        <p>Chart Placeholder...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
