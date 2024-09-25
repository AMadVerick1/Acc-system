const InvoiceQuotation = require('../models/InvoiceQuotationModel');

const getAllInvoiceQuotations = async () => {
    try {
        return await InvoiceQuotation.find();
    } catch (error) {
        console.error('Error fetching invoice/quotations:', error);
        throw error;
    }
};


const createInvoiceQuotation = async (invoiceQuotationData) => {
    try {
        const newInvoiceQuotation = new InvoiceQuotation({ ...invoiceQuotationData });
        return await newInvoiceQuotation.save();
    } catch (error) {
        console.error('Error creating invoice/quotation:', error);
        throw error;
    }
};

const updateInvoiceQuotation = async (id, invoiceQuotationData) => {
    try {
        const updatedInvoiceQuotation = await InvoiceQuotation.findByIdAndUpdate(id, invoiceQuotationData, { new: true });
        return updatedInvoiceQuotation;
    } catch (error) {
        console.error('Error updating invoice/quotation:', error);
        throw error;
    }
};

const deleteInvoiceQuotation = async (id) => {
    try {
        return await InvoiceQuotation.findByIdAndDelete(id);
    } catch (error) {
        console.error('Error deleting invoice/quotation:', error);
        throw error;
    }
};

module.exports = {
    getAllInvoiceQuotations,
    createInvoiceQuotation,
    updateInvoiceQuotation,
    deleteInvoiceQuotation
}