const invoiceQuotationService = require('../services/invoiceQuotationService.js');
const InvoiceQuotation = require('../models/InvoiceQuotationModel'); 

const createInvoiceQuotation = async (req, res) => {
    try {
        const { type, ...restData } = req.body;
        const invoiceQuotation = new InvoiceQuotation({ type, ...restData });
        await invoiceQuotation.save();
        res.status(201).json(invoiceQuotation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getInvoiceQuotations = async (req, res) => {
    try {
        const invoiceQuotations = await invoiceQuotationService.getAllInvoiceQuotations();
        res.status(200).json(invoiceQuotations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const updateInvoiceQuotation = async (req, res) => {
    try {
        const updatedInvoiceQuotation = await invoiceQuotationService.updateInvoiceQuotation(req.params.id, req.body);
        res.status(200).json(updatedInvoiceQuotation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteInvoiceQuotation = async (req, res) => {
    try {
        const deletedInvoiceQuotation = await invoiceQuotationService.deleteInvoiceQuotation(req.params.id);
        res.status(200).json(deletedInvoiceQuotation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createInvoiceQuotation,
    getInvoiceQuotations,
    updateInvoiceQuotation,
    deleteInvoiceQuotation
};
