const rateLimit = require('express-rate-limit');

// Define the rate limit rule
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Include rate limit info in the response headers
});

module.exports = limiter;
