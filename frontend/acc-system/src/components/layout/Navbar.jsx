// src/Navbar.js
import React from 'react';
import logo from '../../assets/Moripe-Logo.png';
import './layout.css'; // CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src= {logo} alt="logo"></img>
            </div>
            <ul className="navbar-links">
                <li><a href="">Notifications</a></li>
                <li><a href="">Settings</a></li>
                <li><a href="">Sign-out</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
