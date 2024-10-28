require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const https = require('https');  // Import HTTPS module

const app = express();

// Debug log for app startup
console.log('Starting the server...');

// Load ZeroSSL certificate files with debug logs
// const options = {
//     key: fs.readFileSync('./certs/your-domain.key'),    // Update with the path to your private key file
//     cert: fs.readFileSync('./certs/your-domain.crt'),   // Update with the path to your certificate file
//     ca: fs.readFileSync('./certs/ca_bundle.crt'),       // Update with the path to the CA bundle if available
// };

console.log('Loaded ZeroSSL certificates.');

// Certificate Validation File (Optional, for verification purposes)
app.get('/.well-known/pki-validation/944647C4DDFA2F147653B1487A538473.txt', (req, res) => {
    console.log('Serving certificate validation file...');
    res.sendFile(path.join(__dirname, './944647C4DDFA2F147653B1487A538473.txt'));
});

// Middleware
app.use(express.json());
console.log('JSON middleware activated.');
app.use(cors());
console.log('CORS middleware activated.');

// Debug log for incoming requests
app.use((req, res, next) => {
    console.log(`Received a ${req.method} request for ${req.url}`);
    next();
});

// Routes
app.use('/users', require('./routes/userRoutes'));
console.log('Users route activated.');
app.use('/invoice-quotation', require('./routes/invoiceQuotationRoutes'));
console.log('Invoice/Quotation route activated.');
app.use('/accounts', require('./routes/accountsRoutes'));
console.log('Accounts route activated.');
app.use('/budgets', require('./routes/budgetRoutes'));
console.log('Budgets route activated.');
app.use('/transactions', require('./routes/transactionsRoutes'));
console.log('Transactions route activated.');
app.use('/payroll', require('./routes/payrollRoutes'));
console.log('Payroll route activated.');
app.use('/reports', require('./routes/reportsRoutes'));
console.log('Reports route activated.');

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode.');
    app.use(express.static(path.join(__dirname, './frontend/acc-system/build')));
    console.log('Serving static assets from React frontend build.');

    // Handle any other routes by serving index.html (React)
    app.get('*', (req, res) => {
        console.log(`Serving index.html for route: ${req.url}`);
        res.sendFile(path.join(__dirname, './frontend/acc-system/build', 'index.html'));
    });
} else {
    console.log('Running in development mode.');
}

// Connect to the Database with debug logs
console.log('Attempting to connect to the database...');
connectDB()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Database connection error:', err.message));

// Proxy Route (Optional, for external API requests)
app.use(async (req, res) => {
    try {
        console.log(`Proxying request to: http://67.202.33.127:5000${req.url}`);
        const response = await axios({
            method: req.method,
            url: `http://67.202.33.127:5000${req.url}`,
            data: req.body,
            headers: {
                'Content-Type': 'application/json',
                ...req.headers,
            },
        });
        console.log(`Proxy request successful with status ${response.status}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(error.response?.status || 500).json({
            message: error.message || 'Internal Server Error',
        });
    }
});

// Start the HTTPS server with debug logs
const PORT = process.env.PORT || 5000;
https.createServer(app).listen(PORT, () => {
    console.log(`Secure server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
