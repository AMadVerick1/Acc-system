import React, { useState, useEffect } from 'react';
import TransactionsTable from '../tables/TransactionsTable';
import { useAccounts } from '../../../context/accountContext';
import { useTransactions } from '../../../context/transactionContext';
import TransactionFormModal from '../modals/TransactionsModal'; // Import the modal component
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
    section: { marginBottom: 10 },
    companyHeader: { fontWeight: 'bold', fontSize: 14, textAlign: 'center', marginBottom: 10 },
    companySubHeader: { fontSize: 10, textAlign: 'center', marginBottom: 20 },
    companyInfo: { fontSize: 10, marginBottom: 20 },
    billTo: { marginTop: 20, marginBottom: 20, fontSize: 10 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 5, fontWeight: 'bold' },
    tableRow: { flexDirection: 'row', marginBottom: 5, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
    tableCell: { width: '25%', fontSize: 10 },
    totalSection: { marginTop: 20, fontSize: 12, fontWeight: 'bold', textAlign: 'right' },
    bankDetails: { marginTop: 20, fontSize: 10 },
    footerLine: { width: '100%', borderTopWidth: 1, borderTopColor: '#000', marginVertical: 5 },
});

const InvoiceDocument = ({ formData, type, transactionId }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text>{type} No: {transactionId || 'N/A'}</Text>
                <Text>Date: {new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.section}>
                <Text>MORIPE BUSINESS TRAINING & CONSULTANT PTY LTD</Text>
                <Text>Enterprise Development Solutions</Text>
                <Text>104 First Rd, Kew</Text>
                <Text>Sandton</Text>
                <Text>2090</Text>
                <Text>Phone: 011 443 0113</Text>
                <Text>Email: info@moripe.co.za</Text>
                <Text>VAT Number: 4340204041</Text>
            </View>
            <View style={styles.section}>
                <Text>Bill To: {formData.customerName}</Text>
                <Text>Email: {formData.customerEmail}</Text>
            </View>
            <View style={styles.section}>
                <Text>Items:</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCell}>Account Name</Text>
                    <Text style={styles.tableCell}>Description</Text>
                    <Text style={styles.tableCell}>Source</Text>
                    <Text style={styles.tableCell}>Amount</Text>
                    <Text style={styles.tableCell}>Status</Text>
                </View>
                {formData.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.name}</Text>
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
        </Page>
    </Document>
);

export default function AllTransactions({ transactions, onEdit }) {
    const { removeTransaction } = useTransactions();
    const { accounts, fetchAccounts } = useAccounts(); 
    const [transactionRows, setTransactionRows] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    const headers = ['Date', 'Account Name', 'Description', 'Source', 'Amount', 'Status', 'Actions'];

    useEffect(() => {
        const fetchAccountNames = async () => {
            try {
                await fetchAccounts(); 
                const rowsWithAccountNames = transactions.map((transaction) => {
                    const { date, account, description, source, amount, status } = transaction;
                    const accountObj = accounts.find(acc => acc._id === account);
                    const accountName = accountObj ? accountObj.name : 'Unknown Account';
                    return [
                        date,
                        accountName,
                        description,
                        source,
                        `R${amount.toFixed(2)}`,
                        status,
                        <>
                            <button onClick={() => onEdit(transaction)}>Edit</button>
                            <button onClick={() => removeTransaction(transaction._id)}>Delete</button>
                            <button onClick={() => handleGenerateInvoiceClick(transaction)}>Generate Invoice</button>
                        </>
                    ];
                });
                setTransactionRows(rowsWithAccountNames);
            } catch (error) {
                console.error('Error fetching accounts or processing transactions:', error);
            }
        };

        fetchAccountNames();
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

            {modalIsOpen && (
                <TransactionFormModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    initialData={selectedTransaction}
                    onSubmit={handleGenerateInvoice}
                />
            )}

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
}
