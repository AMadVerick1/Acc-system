const express = require('express');
const { createInvoiceQuotation, getInvoicesQuotations, getInvoiceQuotationById, updateInvoiceQuotation, deleteInvoiceQuotation, getAllInvoiceQuotations } = require('../controllers/InvoiceQuotationController');

const router = express.Router();

router.post('/create', createInvoiceQuotation);
router.get('/get/type/:type', getInvoicesQuotations); 
router.get('/getAll', getAllInvoiceQuotations);
router.get('/get/:id', getInvoiceQuotationById);
router.put('/update/:id', updateInvoiceQuotation);
router.delete('/delete/:id', deleteInvoiceQuotation);

module.exports = router;