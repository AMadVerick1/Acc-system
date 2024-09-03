// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/dashboard/Home';
import CashFlow from './pages/dashboard/Cash_Flow_Management';
import FinancialOverview from './pages/dashboard/Financial_Overview/Financial_Overview';
// import BudgetOverview from './pages/dashboard/Financial_Overview/BudgetOverview';
import Payroll from './pages/dashboard/Payroll';
import Reports from './pages/dashboard/Reports';
import Login from './pages/authentication/login';
import GlobalStateProvider from './context/GlobalStateProvider';

function App() {
    return (
        <GlobalStateProvider>
            <div className="app-container">
                <div className="navbar-container">
                    <Navbar />
                </div>
                <div className="content-container">
                    <Sidebar />
                    <main>
                        <Routes>
                            {/* Public Route */}
                            <Route path="/login" element={<Login />} />
                            
                            {/* Dashboard Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/cash-flow" element={<CashFlow />} />
                            <Route path="/financial-overview" element={<FinancialOverview />} />
                            {/* <Route path="/budgets" element={<BudgetOverview />} /> */}
                            <Route path="/payroll" element={<Payroll />} />
                            <Route path="/reports" element={<Reports />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </GlobalStateProvider>
    );
}

export default App;
