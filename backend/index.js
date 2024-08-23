const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const rateLimiter = require('./rateLimiter');

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountsRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const reportRoutes = require("./routes/reportsRoutes");


const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(rateLimiter);

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/reports", reportRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Home page of the Accounting Management System");
});

// Error Handling Middleware
app.use(errorHandler);

// Database Connection and Server Startup
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    });
