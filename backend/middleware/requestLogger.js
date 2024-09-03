// requestLogger.js
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`, {
        headers: req.headers,
        body: req.body,
    });
    next();
};

module.exports = requestLogger;
