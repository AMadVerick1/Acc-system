import React, { useState, useEffect } from 'react';
import TransactionsTable from '../tables/TransactionsTable';
import InvoiceQuotationForm from '../forms/invoiceQuotationForm';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';

export default function AllTransactions({ transactions, onEdit }) {
    const { removeTransaction } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts(); // Destructure correctly
    const [transactionRows, setTransactionRows] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [formType, setFormType] = useState(null); // 'Invoice' or 'Quotation'

    const headers = ['Date', 'Account Name', 'Description', 'Source', 'Amount', 'Status', 'Actions'];

    useEffect(() => {
        console.log('Fetching account names and processing transactions...');
        const fetchAccountNames = async () => {
            try {
                await fetchAccounts(); // Ensure accounts are fetched
                const rowsWithAccountNames = await Promise.all(
                    transactions.map(async (transaction) => {
                        const { date, account, description, source, amount, status } = transaction;
                        try {
                            // Find the account name based on the account ID
                            const accountObj = accounts.find(acc => acc._id === account);
                            const accountName = accountObj ? accountObj.name : 'Unknown Account'; // Extract account name
                            console.log(`Transaction ${transaction._id}: Account name is ${accountName}`);
                            return [
                                date,
                                accountName,
                                description,
                                source,
                                `R${amount}`, 
                                status,
                                <>
                                    <button onClick={() => onEdit(transaction)}>Edit</button>
                                    <button onClick={() => removeTransaction(transaction._id)}>Delete</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Invoice')}>Generate Invoice</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Quotation')}>Generate Quotation</button>
                                </>
                            ];
                        } catch (error) {
                            console.error('Error processing transaction:', error);
                            return [
                                date,
                                'Error', // Fallback in case of error
                                description,
                                source,
                                `R${amount}`,
                                status,
                                <>
                                    <button onClick={() => onEdit(transaction)}>Edit</button>
                                    <button onClick={() => removeTransaction(transaction._id)}>Delete</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Invoice')}>Generate Invoice</button>
                                    <button onClick={() => handleGenerateInvoiceQuotation(transaction, 'Quotation')}>Generate Quotation</button>
                                </>
                            ];
                        }
                    })
                );
                setTransactionRows(rowsWithAccountNames); // Update state with rows containing account names
            } catch (error) {
                console.error('Error fetching accounts or processing transactions:', error);
            }
        };

        fetchAccountNames();
    }, []); // Updated dependencies

    const handleGenerateInvoiceQuotation = (transaction, type) => {
        console.log(`Generating ${type} for transaction ${transaction._id}`);
        setSelectedTransaction(transaction); // Set the entire transaction object
        setFormType(type); // Set whether it's an invoice or quotation
    };

    const handleCloseForm = () => {
        setSelectedTransaction(null); // Reset the selected transaction when closing the form
        setFormType(null); // Reset the form type
    };

    return (
        <div className="all-transactions">
            <TransactionsTable headers={headers} rows={transactionRows} />
            {selectedTransaction && formType && (
                <div className="invoice-quotation-modal">
                    <InvoiceQuotationForm
                        transaction={selectedTransaction}
                        type={formType}
                        onClose={handleCloseForm} // Pass a close function to the form
                    />
                </div>
            )}
        </div>
    );
}
