require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/invoice-quotation', require('./routes/invoiceQuotationRoutes'));
app.use('/accounts', require('./routes/accountsRoutes'));
app.use('/budgets', require('./routes/budgetRoutes'));
app.use('/transactions', require('./routes/transactionsRoutes'));
app.use('/payroll', require('./routes/payrollRoutes'));
app.use('/reports', require('./routes/reportsRoutes'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder for the frontend
    app.use(express.static(path.join(__dirname, './frontend/acc-system/build')));

    // Handle any other routes by serving index.html (React)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/acc-system/build', 'index.html'));
    });
}

// Connect to the Database
connectDB();

// Start the server
const PORT = process.env.BACKEND_API_URL || 5000; // Use a default port if not in the .env file
app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
