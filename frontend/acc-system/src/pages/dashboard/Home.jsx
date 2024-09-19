import './styles.css';
import ApexCharts from 'apexcharts';
import React, { useState, useEffect } from 'react';
import Cards from '../../components/common/card/card.jsx'; 


export default function Dashboard() {

    return (
        <div className="dashboard">
            <div className="sid">
                {/* Sidebar icons would go here */}
            </div>
            <div className="main-content">
                <div className="budget-container">
                    <h1 className="heading-budget">Overview</h1>
                    <div className="row1">

                    </div>

                    <div className="transactions-container">
                        
                    </div>

                    <div className="row3">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
