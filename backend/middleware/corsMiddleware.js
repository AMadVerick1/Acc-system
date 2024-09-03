// corsMiddleware.js
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
};

module.exports = cors(corsOptions);
