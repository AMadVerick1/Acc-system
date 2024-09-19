import React, { useState, useEffect } from 'react';
import { useAccounts } from '../../../context/accountContext';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import './invQuo.css';

// Define PDF styles
const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000' },
    tableRow: { flexDirection: 'row', marginBottom: 5 },
    tableCell: { width: '25%' }
});

// PDF Component
const InvoiceDocument = ({ formData, type, transactionId }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text>{type} No: {transactionId}</Text>
                <Text>Date: {new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.section}>
                <Text>MORIPE BUSINESS TRAINING & CONSULTANT PTY LTD</Text>
                <Text>Enterprise Development Solutions</Text>
                <Text>101 First Rd, Roda, Dasnato, 2090</Text>
                <Text>Phone: 011 443 0113</Text>
                <Text>Email: info@moripe.co.za</Text>
                <Text>VAT Number: 123456789</Text>
            </View>
            <View style={styles.section}>
                <Text>Bill To: {formData.customerName}</Text>
                <Text>Email: {formData.customerEmail}</Text>
            </View>
            <View style={styles.section}>
                <Text>Items:</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCell}>Description</Text>
                    <Text style={styles.tableCell}>Quantity</Text>
                    <Text style={styles.tableCell}>Price</Text>
                    <Text style={styles.tableCell}>Total</Text>
                </View>
                {formData.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.description}</Text>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>{item.price}</Text>
                        <Text style={styles.tableCell}>{(item.quantity * item.price).toFixed(2)}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text>Total: {formData.total.toFixed(2)}</Text>
            </View>
            <View style={styles.section}>
                <Text>Bank Details:</Text>
                <Text>Bank Name: {formData.bankName}</Text>
                <Text>Account Number: {formData.accountNumber}</Text>
                <Text>Branch Name: {formData.branchName}</Text>
                <Text>Branch Code: {formData.branchCode}</Text>
            </View>
        </Page>
    </Document>
);

export default function InvoiceQuotationForm({ transactionId, type }) {
    const { accounts, getAccountById } = useAccounts();

    // Fetch account data
    useEffect(() => {
        getAccountById()
            .then(() => console.log('Account data fetched successfully:', accounts))
            .catch((error) => console.error('Error fetching account data:', error));
    }, []);

    const [formData, setFormData] = useState({
        customerName: accounts?.name || '',
        customerEmail: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        bankName: '',
        accountNumber: '',
        branchName: '',
        branchCode: '',
        total: 0,
    });

    useEffect(() => {
        const total = formData.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );
        setFormData((prev) => ({ ...prev, total }));
    }, [formData.items]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, e) => {
        const updatedItems = [...formData.items];
        updatedItems[index][e.target.name] = e.target.value;
        setFormData({ ...formData, items: updatedItems });
    };

    const handleAddItem = () => {
        setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 1, price: 0 }] });
    };

    return (
        <>
            <form className="inv-form">
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Customer Name"
                />
                <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Customer Email"
                />

                {formData.items.map((item, index) => (
                    <div key={index} className="item-row">
                        <input
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Description"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Quantity"
                        />
                        <input
                            type="number"
                            name="price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Price"
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddItem} className="add-item-btn">
                    Add Item
                </button>

                <PDFDownloadLink
                    document={<InvoiceDocument formData={formData} type={type} transactionId={transactionId} />}
                    fileName={`${type}-${transactionId}.pdf`}
                >
                    {({ loading }) => loading ? 'Loading document...' : `Download ${type}`}
                </PDFDownloadLink>
            </form>
        </>
    );
}
