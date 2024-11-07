import React from 'react';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BalanceIcon from '@mui/icons-material/Balance';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { PiChartLineDownDuotone } from "react-icons/pi";
import { PiChartLineUpDuotone } from "react-icons/pi";
import './card.css';

const Card = ({ title, value }) => {

    const iconSelector = () => {
        // Add icon selector logic here
        if (title === 'Total Income') {
            return <AttachMoneyIcon />;
        }else if (title === 'Net Cash Flow') {
            return <BalanceIcon />;
        }else if (title === 'Amount Due') {
            return <AccessTimeFilledIcon />;
        }else if (title === 'Total Expenses') {
            return <MoneyOffIcon />;
        }else{
            return <p>Icon Placeholder...</p>;
        }
    };

    const valueVisual= () =>{
        if (title === 'Total Income' && value >= 0) {
            return <PiChartLineUpDuotone />;
        }else if (title === 'Total Income' && value < 0) {
            return <PiChartLineDownDuotone />;
        }else if (title === 'Net Cash Flow' && value >= 0) {
            return <PiChartLineUpDuotone />;
        }else if (title === 'Net Cash Flow' && value < 0) {
            return <PiChartLineDownDuotone />;
        }else if (title === 'Amount Due' && value >= 0) {
            return <PiChartLineUpDuotone />;
        }else if (title === 'Amount Due' && value < 0) {
            return <PiChartLineDownDuotone />;
        }else if (title === 'Total Expenses' && value >= 0) {
            return <PiChartLineUpDuotone />;
        }else if (title === 'Total Expenses' && value < 0) {
            return <PiChartLineDownDuotone />;
        }else{
            return <p>Value Visual...</p>;
        }
    }

    return (
        <div className="metric-card">
            <div className="card-content">
                <div className="col-1">
                    <div className="card-icon">
                        {iconSelector()}
                    </div>
                    <div className="card-info">
                        <h3>{title}</h3>
                        {valueVisual()}
                    </div>
                </div>
                <div className="col-2">
                    <div className="card-chart">                        
                        <p>{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
