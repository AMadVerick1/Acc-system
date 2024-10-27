require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const path = require('path');

const app = express();

// Debug log for app startup
console.log('Starting the server...');

// Middleware
app.use(express.json());
console.log('JSON middleware activated.');
app.use(cors());
console.log('CORS middleware activated.');

// Debug log for incoming requests (helpful to see what requests are being made)
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

    // Set static folder for the frontend
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

// Connect to the Database
console.log('Attempting to connect to the database...');
connectDB().then(() => {
    console.log('Database connected successfully.');
}).catch((err) => {
    console.error('Database connection error:', err.message);
});

// Start the server
const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
