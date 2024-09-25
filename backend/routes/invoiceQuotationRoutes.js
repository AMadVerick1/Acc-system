const express = require('express');
const { createInvoiceQuotation, updateInvoiceQuotation, deleteInvoiceQuotation, getInvoiceQuotations } = require('../controllers/InvoiceQuotationController');

const router = express.Router();

router.post('/invoice-quotation/create', createInvoiceQuotation);
router.get('/invoice-quotation/getAll', getInvoiceQuotations);
router.put('/invoice-quotation/update/:id', updateInvoiceQuotation);
router.delete('/invoice-quotation/delete/:id', deleteInvoiceQuotation);


module.exports = router;