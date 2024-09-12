const InvoiceQuotation = require('../models/InvoiceQuotationModel');

const createInvoiceQuotation = async (req, res) => {
    try {
        const invoiceQuotation = new InvoiceQuotation({
            ...req.body,
            transactionId: req.body.transactionId,
        });
        const savedDoc = await invoiceQuotation.save();
        res.status(201).json(savedDoc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getInvoicesQuotations = async (req, res) => {
    try {
        const docs = await InvoiceQuotation.find({ type: req.params.type });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvoiceQuotation = async (req, res) => {
    try {
        const updatedDoc = await InvoiceQuotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDoc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createInvoiceQuotation,
    getInvoicesQuotations,
    updateInvoiceQuotation,
};
