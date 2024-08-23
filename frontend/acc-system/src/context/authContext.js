// // src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     // Simulate checking the authentication status (e.g., from a token or API)
//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             setLoading(true);
//             const token = localStorage.getItem('token');
//             if (token) {
//                 try {
//                     // Validate token (you might do an API call here)
//                     const isValid = await validateToken(token); // Placeholder function

//                     if (isValid) {
//                         setIsAuthenticated(true);
//                     } else {
//                         localStorage.removeItem('token'); // Remove invalid token
//                     }
//                 } catch (error) {
//                     console.error('Token validation error:', error);
//                     localStorage.removeItem('token'); // Handle errors
//                 }
//             }
//             setLoading(false);
//         };

//         checkAuthStatus();
//     }, []);

//     const validateToken = async (token) => {
//         // Simulate token validation. In a real app, send a request to your backend.
//         // Example API call:
//         // const response = await fetch('/api/validate-token', { headers: { Authorization: `Bearer ${token}` } });
//         // return response.ok;

//         return token === ''; // For demo purposes, replace with your logic.
//     };

//     const login = async (userCredentials) => {
//         // Replace with actual login logic
//         const token = ''; // Simulate a token returned from backend
//         localStorage.setItem('token', token);
//         setIsAuthenticated(true);
//         navigate('/'); // Redirect to the dashboard after login
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//         navigate('/login'); // Redirect to login page after logout
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
