// // src/components/common/PrivateRoute.js
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';

// const PrivateRoute = () => {
//     const { isAuthenticated } = useAuth();

//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
// src/components/common/PrivateRoute.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Mock function to check authentication status. Replace with your real auth logic.
const isAuthenticated = () => {
    
    const user = localStorage.getItem('user');
    return !!user;
};

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
