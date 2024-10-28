require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();

// Debug: Starting server setup
console.log('Starting server setup...');

// Certificate Validation File
app.get('/.well-known/pki-validation/944647C4DDFA2F147653B1487A538473.txt', (req, res) => {
    console.log('Serving certificate validation file...');
    res.sendFile(path.resolve(__dirname, '944647C4DDFA2F147653B1487A538473.txt'));
});

// Middleware
app.use(express.json());
console.log('JSON middleware activated.');
app.use(cors());
console.log('CORS middleware activated.');

// Debug log for each incoming request
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    next();
});

// Routes
app.use('/users', (req, res, next) => {
    console.log('Users route accessed.');
    next();
}, require('./routes/userRoutes'));

app.use('/invoice-quotation', (req, res, next) => {
    console.log('Invoice/Quotation route accessed.');
    next();
}, require('./routes/invoiceQuotationRoutes'));

app.use('/accounts', (req, res, next) => {
    console.log('Accounts route accessed.');
    next();
}, require('./routes/accountsRoutes'));

app.use('/budgets', (req, res, next) => {
    console.log('Budgets route accessed.');
    next();
}, require('./routes/budgetRoutes'));

app.use('/transactions', (req, res, next) => {
    console.log('Transactions route accessed.');
    next();
}, require('./routes/transactionsRoutes'));

app.use('/payroll', (req, res, next) => {
    console.log('Payroll route accessed.');
    next();
}, require('./routes/payrollRoutes'));

app.use('/reports', (req, res, next) => {
    console.log('Reports route accessed.');
    next();
}, require('./routes/reportsRoutes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode. Serving static assets...');
    app.use(express.static(path.join(__dirname, './frontend/acc-system/build')));
    app.get('*', (req, res) => {
        console.log(`Serving index.html for route ${req.url}`);
        res.sendFile(path.join(__dirname, './frontend/acc-system/build', 'index.html'));
    });
}

// Database Connection
console.log('Attempting to connect to the database...');
connectDB().then(() => {
    console.log('Database connected successfully.');
}).catch(err => {
    console.error('Database connection error:', err.message);
});

// Proxy Route - Placed last to avoid conflicts
app.use(async (req, res) => {
    console.log(`Proxying request to HTTP API: ${req.method} ${req.url}`);
    try {
        const response = await axios({
            method: req.method,
            url: `http://67.202.33.127:5000${req.url}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
                ...req.headers,
            },
        });
        console.log(`Received response from HTTP API with status ${response.status}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(error.response?.status || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
