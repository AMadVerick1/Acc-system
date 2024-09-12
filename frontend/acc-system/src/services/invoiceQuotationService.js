import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const createInvoiceQuotation = async (invoiceQuotationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/invoice-quotation/create`, invoiceQuotationData);
        return response.data;
    } catch (error) {
        console.error('Error creating invoice/quotation:', error);
        throw error;
    }
};

export const getInvoicesQuotations = async (type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/invoice-quotation/${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoices/quotations:', error);
        throw error;
    }
};

export const updateInvoiceQuotation = async (id, invoiceQuotationData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/invoice-quotation/update/${id}`, invoiceQuotationData);
        return response.data;
    } catch (error) {
        console.error('Error updating invoice/quotation:', error);
        throw error;
    }
}

export const deleteInvoiceQuotation = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/invoice-quotation/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting invoice/quotation:', error);
        throw error;
    }
}