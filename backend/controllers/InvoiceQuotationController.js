const invoiceQuotationService = require('../services/invoiceQuotationService.js');

const createInvoiceQuotation = async (req, res) => {
    try {
        const invoiceQuotation = await invoiceQuotationService.createInvoiceQuotation(req.body);
        res.status(201).json(invoiceQuotation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllInvoiceQuotations = async (req, res) => {
    try {
        const invoiceQuotations = await invoiceQuotationService.getAllInvoiceQuotations();
        res.status(200).json(invoiceQuotations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

const getInvoiceQuotationById = async (req, res) => {
    try {
        const invoiceQuotation = await invoiceQuotationService.getInvoiceQuotationById(req.params.id);
        res.status(200).json(invoiceQuotation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoicesQuotations = async (req, res) => {
    try {
        const type = req.params.type;
        const invoicesQuotations = await invoiceQuotationService.getAllInvoiceQuotations(type);
        res.status(200).json(invoicesQuotations);
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
    getInvoicesQuotations,
    getAllInvoiceQuotations,
    getInvoiceQuotationById,
    updateInvoiceQuotation,
    deleteInvoiceQuotation
}