// sanitizeInput.js
const { sanitize } = require('express-validator');

exports.sanitizeInput = (fields) => {
    return fields.map((field) => sanitize(field));
};
