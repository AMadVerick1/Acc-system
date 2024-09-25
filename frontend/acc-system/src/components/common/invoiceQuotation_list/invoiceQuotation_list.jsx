import './invoiceQuotation_list.css';
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TransactionsTable from '../tables/TransactionsTable';
import { useAccounts } from '../../../context/accountContext';
import InvoiceQuotationForm from '../forms/invoiceQuotationForm';
import { useInvoiceQuotationContext } from '../../../context/invoiceQuotationContext';

export default function InvoiceQuotationList({ invoiceQuotation, onEdit }) {
    
    const { accounts, fetchAccounts } = useAccounts();
    const [formType, setFormType] = useState('invoice');
    const { removeInvoiceQuotation, error } = useInvoiceQuotationContext();
    const [transactionRows, setTransactionRows] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const headers = ['Date', 'Customer Name', 'Customer Email', 'Description', 'Amount', 'Due', 'Status', 'Actions'];

    useEffect(() => {
        console.log('Fetching account names and processing invoiceQuotation...');
        const fetchAccountNames = async () => {
            try {
                await fetchAccounts(); // Ensure accounts are fetched
                const rowsWithAccountNames = await Promise.all(
                    invoiceQuotation.map(async (transaction) => {
                        const { date, customer, description, amount, due, status } = transaction;
                        try {
                            // Find the account name based on the account ID
                            const customerObj = accounts.find(acc => acc._id === customer);
                            const customerName = customerObj ? customerObj.name : 'Unknown Account'; // Extract account name
                            const customerEmail = customerObj ? customerObj.email : '';
                            console.log(`Transaction ${transaction._id}: Account name is ${customerName}`);

                            return [
                                date,
                                customerName,
                                customerEmail,
                                description,
                                `R${amount}`,
                                `R${due}`,
                                status,
                                <>
                                    <button onClick={() => onEdit(transaction)}>Edit</button>
                                    <button onClick={() => removeInvoiceQuotation(transaction._id)}>Delete</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Invoice')}>Generate Invoice</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Quotation')}>Generate Quotation</button>
                                </>
                            ];
                        } catch (error) {
                            console.error('Error processing transaction:', error);
                            return [
                                date,
                                'Error',
                                '',
                                description,
                                `R${amount}`,
                                `R${due}`,
                                status,
                                <>
                                    <button onClick={() => onEdit(transaction)}>Edit</button>
                                    <button onClick={() => removeInvoiceQuotation(transaction._id)}>Delete</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Invoice')}>Generate Invoice</button>
                                </>
                            ];
                        }
                    })
                );
                setTransactionRows(rowsWithAccountNames); // Update state with rows containing account names
            } catch (error) {
                console.error('Error fetching accounts or processing invoiceQuotation:', error);
            }
        };

        fetchAccountNames();
    }, [invoiceQuotation, accounts, fetchAccounts, onEdit, removeInvoiceQuotation]); // Updated dependencies

    const handleGenerateInvoiceQuotation = (transaction, type) => {
        setSelectedTransaction(transaction);
        setFormType(type);
        console.log(`Generating ${type} for transaction ${transaction._id}`);
    };

    return (
        <div className="invoice-quotation-list">
            {error && <div className="error-message">{error}</div>}
            <TransactionsTable headers={headers} rows={transactionRows} />
            {selectedTransaction && (
                <div className="pdf-download-section">
                    <PDFDownloadLink
                        document={<InvoiceQuotationForm transactionId={selectedTransaction._id} type={formType} />}
                        fileName={`${formType}-${selectedTransaction._id}.pdf`}
                    >
                        {({ loading }) => loading ? 'Loading PDF...' : `Download ${formType} as PDF`}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
}
