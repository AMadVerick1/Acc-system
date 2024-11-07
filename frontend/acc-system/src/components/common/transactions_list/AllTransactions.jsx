import React, { useState, useEffect } from 'react';
import TransactionsTable from '../tables/TransactionsTable';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
import TransactionFormModal from '../modals/TransactionsModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument';

const AllTransactions = ({ transactions, onEdit }) => {
    const { removeTransaction } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts();
    const [transactionRows, setTransactionRows] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    const headers = ['Date', 'Account Name', 'Description', 'Source', 'Amount', 'Status', 'Actions'];

    useEffect(() => {
        const generateTransactionRows = async () => {
            await fetchAccounts();
            const rows = transactions.map((transaction) => {
                const accountName = accounts.find(acc => acc._id === transaction.account)?.name || 'Unknown Account';
                return [
                    transaction.date,
                    accountName,
                    transaction.description,
                    transaction.source,
                    `R${transaction.amount.toFixed(2)}`,
                    transaction.status,
                    <TransactionActions transaction={transaction} onEdit={onEdit} removeTransaction={removeTransaction} handleGenerateInvoiceClick={handleGenerateInvoiceClick} />
                ];
            });
            setTransactionRows(rows);
        };
        generateTransactionRows();
    }, [transactions, accounts, fetchAccounts, onEdit]);

    const handleGenerateInvoiceClick = (transaction) => {
        setSelectedTransaction(transaction);
        setModalIsOpen(true);
    };

    const handleGenerateInvoice = (customerData) => {
        const formData = {
            ...selectedTransaction,
            customerName: customerData.name || 'Unknown Customer',
            customerEmail: customerData.email || 'Unknown Email',
            items: [{
                name: selectedTransaction.account,
                description: selectedTransaction.description,
                source: selectedTransaction.source,
                amount: selectedTransaction.amount,
                status: selectedTransaction.status
            }],
            total: selectedTransaction.amount
        };
        
        setInvoiceData(formData);
        setModalIsOpen(false);
    };

    return (
        <div className="all-transactions">
            <TransactionsTable headers={headers} rows={transactionRows} />
            <TransactionFormModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} initialData={selectedTransaction} onSubmit={handleGenerateInvoice} />
            {invoiceData && !modalIsOpen && (
                <PDFDownloadLink
                    document={<InvoiceDocument formData={invoiceData} type="Invoice" transactionId={selectedTransaction._id} />}
                    fileName={`Invoice-${selectedTransaction._id}.pdf`}
                >
                    {({ loading }) => (loading ? 'Generating Invoice...' : 'Download Invoice')}
                </PDFDownloadLink>
            )}
        </div>
    );
};

const TransactionActions = ({ transaction, onEdit, removeTransaction, handleGenerateInvoiceClick }) => (
    <>
        <button onClick={() => onEdit(transaction)}>Edit</button>
        <button onClick={() => removeTransaction(transaction._id)}>Delete</button>
        <button onClick={() => handleGenerateInvoiceClick(transaction)}>Generate Invoice</button>
    </>
);

export default AllTransactions;
