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

// app.use((req, res, next) => {
// res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// next();
// });



// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/users', require('./routes/userRoutes'));
// app.use('/accounts', require('./routes/accountsRoutes'));
app.use('/budgets', require('./routes/budgetRoutes'));
// app.use('/transactions', require('./routes/transactionsRoutes'));
// app.use('/payroll', require('./routes/payrollRoutes'));
// app.use('/reports', require('./routes/reportsRoutes'));

// Error Handling Middleware
// app.use(errorHandler);

// Connect to Database
connectDB();
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
