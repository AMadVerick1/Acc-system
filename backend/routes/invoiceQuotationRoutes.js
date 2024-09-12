const express = require('express');
const { createInvoiceQuotation, getInvoicesQuotations, updateInvoiceQuotation } = require('../controllers/InvoiceQuotationController');

const router = express.Router();

router.post('/create', createInvoiceQuotation); // Create Invoice/Quotation
router.get('/:type', getInvoicesQuotations); // Get Invoices/Quotations based on type
router.put('/update/:id', updateInvoiceQuotation); // Update Invoice/Quotation
router.delete('/delete/:id', updateInvoiceQuotation); // Delete Invoice/Quotation

module.exports = router;
