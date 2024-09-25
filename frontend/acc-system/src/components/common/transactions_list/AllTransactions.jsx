import React, { useState, useEffect } from 'react';
import TransactionsTable from '../tables/TransactionsTable';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
import TransactionFormModal from '../modals/TransactionsModal'; // Import the modal component
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000' },
    tableRow: { flexDirection: 'row', marginBottom: 5 },
    tableCell: { width: '25%' }
});

const InvoiceDocument = ({ formData, type, transactionId }) => (
    <Document>
        <Page className="invoice-container" style={styles.page}>
            <View className="inv_num" style={styles.section}>
                <Text>{type} No: {transactionId || 'N/A'}</Text>
                <Text>Date: {new Date().toLocaleDateString()}</Text>
            </View>
            <View className="company-info" style={styles.section}>
                <Text>MORIPE BUSINESS TRAINING & CONSULTANT PTY LTD</Text>
                <Text>Enterprise Development Solutions</Text>
                <Text>101 First Rd, Roda, Dasnato, 2090</Text>
                <Text>Phone: 011 443 0113</Text>
                <Text>Email: info@moripe.co.za</Text>
                <Text>VAT Number: 123456789</Text>
            </View>
            <View className="bill-to" style={styles.section}>
                <Text>Bill To: {formData.customerName}</Text>
                <Text>Email: {formData.customerEmail}</Text>
            </View>
            <View className="item-list" style={styles.section}>
                <Text>Items:</Text>
                <View style={styles.tableHeader}>
                    {/* <Text style={styles.tableCell}>Date</Text> */}
                    <Text style={styles.tableCell}>Account Name</Text>
                    <Text style={styles.tableCell}>Description</Text>
                    <Text style={styles.tableCell}>Source</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                    <Text style={styles.tableCell}>Status</Text>
                </View>
                {formData.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        {/* <Text style={styles.tableCell}>{item.date}</Text> */}
                        <Text style={styles.tableCell}>{item.accountName}</Text>
                        <Text style={styles.tableCell}>{item.description}</Text>
                        <Text style={styles.tableCell}>{item.source}</Text>
                        <Text style={styles.tableCell}>{item.amount.toFixed(2)}</Text>
                        <Text style={styles.tableCell}>{item.status}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text>Total: {formData.total.toFixed(2)}</Text>
            </View>
            <View className="bank-details" style={styles.section}>
                <Text>Bank Details:</Text>
                <Text>Bank Name: {formData.bankName}</Text>
                <Text>Account Number: {formData.accountNumber}</Text>
                <Text>Branch Name: {formData.branchName}</Text>
                <Text>Branch Code: {formData.branchCode}</Text>
            </View>
        </Page>
    </Document>
);

export default function AllTransactions({ transactions, onEdit }) {
    const { removeTransaction } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts(); 
    const [transactionRows, setTransactionRows] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formType, setFormType] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);  // State to hold the invoice data

    const headers = ['Date', 'Account Name', 'Description', 'Source', 'Amount', 'Status', 'Actions'];

    useEffect(() => {
        const fetchAccountNames = async () => {
            try {
                await fetchAccounts(); 
                const rowsWithAccountNames = await Promise.all(
                    transactions.map(async (transaction) => {
                        const { date, account, description, source, amount, status } = transaction;
                        const accountObj = accounts.find(acc => acc._id === account);
                        const accountName = accountObj ? accountObj.name : 'Unknown Account' ? 'Invoice' : 'Quotation';
                        return [
                            date,
                            accountName,
                            description,
                            source,
                            `R${amount.toFixed(2)}`, // Ensure amount is correctly formatted
                            status,
                            <>
                                <button onClick={() => onEdit(transaction)}>Edit</button>
                                <button onClick={() => removeTransaction(transaction._id)}>Delete</button>
                                <button onClick={() => handleGenerateInvoiceClick(transaction)}>Generate Invoice</button>
                            </>
                        ];
                    })
                );
                setTransactionRows(rowsWithAccountNames);
            } catch (error) {
                console.error('Error fetching accounts or processing transactions:', error);
            }
        };

        fetchAccountNames();
    }, [transactions]); 

    const handleGenerateInvoiceClick = (transaction) => {
        setSelectedTransaction(transaction);
        setModalIsOpen(true);  // Open the modal to capture customer details
    };

    const handleGenerateInvoice = (customerData) => {
        const formData = {
            ...selectedTransaction,
            customerName: customerData.customerName,
            customerEmail: customerData.customerEmail,
            items: [{ 
                description: selectedTransaction.description,
                date: selectedTransaction.date,
                quantity: 1,  // Assuming 1 as default
                amount: selectedTransaction.amount
            }],
            total: selectedTransaction.amount
        };
        
        // Set the formData into state and close the modal
        setInvoiceData(formData);
        setModalIsOpen(false); // Close the modal after submitting customer details
    };

    return (
        <div className="all-transactions">
            <TransactionsTable headers={headers} rows={transactionRows} />

            {/* Modal for entering customer details */}
            {modalIsOpen && (
                <TransactionFormModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    initialData={selectedTransaction}  // Pre-fill selected transaction data
                    onSubmit={handleGenerateInvoice}   // Handle the form submission and generate the invoice
                />
            )}

            {/* Display the PDFDownloadLink if invoiceData is available */}
            {invoiceData && (
                <PDFDownloadLink
                    document={<InvoiceDocument formData={invoiceData} type="Invoice" transactionId={selectedTransaction._id} />}
                    fileName={`Invoice-${selectedTransaction._id}.pdf`}
                >
                    {({ loading }) => (loading ? 'Generating Invoice...' : 'Download Invoice')}
                </PDFDownloadLink>
            )}
        </div>
    );
}
