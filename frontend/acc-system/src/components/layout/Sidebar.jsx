// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { FaFileAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";

import './layout.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/" className="nav-item" activeClassName="active">
                            <FaHome className="nav-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cash-flow" className="nav-item" activeClassName="active">
                            <GoArrowSwitch className="nav-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/financial-overview" className="nav-item" activeClassName="active">
                            <FaFileAlt className="nav-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/payroll" className="nav-item" activeClassName="active">
                            <MdPayments className="nav-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className="nav-item" activeClassName="active">
                            <FaChartLine className="nav-icon" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
