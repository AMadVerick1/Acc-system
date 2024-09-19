import React, { createContext, useState, useContext } from 'react';
import { createInvoiceQuotation, getAllInvoiceQuotations, updateInvoiceQuotation, deleteInvoiceQuotation } from '../services/invoiceQuotationService';
// import { getAllAccounts } from '../services/accountService';

const InvoiceQuotationContext = createContext();

export const InvoiceQuotationContextProvider = ({ children }) => {
    const [invoiceQuotations, setInvoiceQuotations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [accounts, setAccounts] = useState([]);
    const [editingInvoiceQuotation, setEditingInvoiceQuotation] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchAllInvoiceQuotations = async () => {
        setLoading(true);
        setError(null); // Reset error
        try {
            const data = await getAllInvoiceQuotations();
            setInvoiceQuotations(data);
        } catch (error) {
            console.error('Failed to fetch invoice/quotation:', error);
            setError('Failed to fetch invoice/quotation. Please try again later.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };    

    const addInvoiceQuotation = async (invoiceQuotationData) => {
        setError(null);
        try {
            const newInvoiceQuotation = await createInvoiceQuotation(invoiceQuotationData);
            setInvoiceQuotations((prev) => [...prev, newInvoiceQuotation]);
        } catch (error) {
            console.error('Failed to add invoice/quotation:', error);
            setError('Failed to add invoice/quotation. Please try again.');
        }
    };
    
    const editInvoiceQuotation = async (id, updateData) => {
        try {
            const updatedInvoiceQuotation = await updateInvoiceQuotation(id, updateData);
            setInvoiceQuotations((prev) =>
                prev.map((invoiceQuotation) => (invoiceQuotation._id === id ? updatedInvoiceQuotation : invoiceQuotation))
            );
        } catch (error) {
            console.error('Failed to update invoice/quotation:', error);
            setError('Failed to update invoice/quotation. Please try again.');
        }
    };

    const removeInvoiceQuotation = async (id) => {
        try {
            await deleteInvoiceQuotation(id);
            setInvoiceQuotations((prev) => prev.filter((invoiceQuotation) => invoiceQuotation._id !== id));
        } catch (error) {
            console.error('Failed to delete invoice/quotation:', error);
            setError('Failed to delete invoice/quotation. Please try again.');
        }
    };

    return (
        <InvoiceQuotationContext.Provider value={{
            invoiceQuotations,
            fetchAllInvoiceQuotations,
            addInvoiceQuotation,
            editInvoiceQuotation,
            removeInvoiceQuotation,
            loading,
            error,
            editingInvoiceQuotation,
            setEditingInvoiceQuotation,
            modalIsOpen,
            setModalIsOpen
        }}>
            {children}
        </InvoiceQuotationContext.Provider>
    );
};

export const useInvoiceQuotationContext = () => useContext(InvoiceQuotationContext);