import React from 'react';
import Card from './card';
import './card.css'; // Adjust styling path as needed

const Cards = ({ metrics }) => {
    return (
        <div className="cards-container">
            {metrics.map((metric, index) => (
                <Card key={index} title={metric.title} value={metric.value} />
            ))}
        </div>
    );
};

export default Cards;
