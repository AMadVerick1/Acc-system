// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
// const limiter = require('./middleware/rateLimiter');
// const { errorHandler } = require('./middleware/errorHandler');

// Initialize Express
const app = express();
 
// middleware
app.use(express.json());
app.use(cors());
// const corsOptions = {
//     origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : '*',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// Routes
// app.use('/api/auth', require('./routes/auth Routes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/invoice-quotation', require('./routes/invoiceQuotationRoutes'));
app.use('/accounts', require('./routes/accountsRoutes'));
app.use('/budgets', require('./routes/budgetRoutes'));
app.use('/transactions', require('./routes/transactionsRoutes'));
app.use('/payroll', require('./routes/payrollRoutes'));
app.use('/reports', require('./routes/reportsRoutes'));

// Connect to Database
connectDB();

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);