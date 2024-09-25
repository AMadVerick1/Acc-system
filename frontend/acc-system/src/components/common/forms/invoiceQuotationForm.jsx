import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import {useInvoiceQuotationContext} from '../../../context/invoiceQuotationContext';
import './invQuo.css';

// Define PDF styles
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

export default function InvoiceQuotationForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        type: 'Invoice',
        items: [{ description: '', quantity: 1, price: 0 }],
        total: 0,
        bankName: '',
        accountNumber: '',
        branchName: '',
        branchCode: ''
    });

    // Recalculate total whenever items change
    useEffect(() => {
        const total = formData.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setFormData((prev) => ({ ...prev, total }));
    }, [formData.items]);

    // Generic handle change for form inputs
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle item-specific change
    const handleItemChange = (index, e) => {
        const updatedItems = [...formData.items];
        updatedItems[index][e.target.name] = e.target.value;
        setFormData({ ...formData, items: updatedItems });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            account: formData.type, // Use type as account
            date: new Date(), // Current date
            description: formData.items.map(item => item.description).join(', '), // Concatenate item descriptions
            source: formData.customerName, // Use customer name as source
            amount: formData.total, // Total amount
            status: 'Pending', // Default status
            type: formData.type === 'Invoice' ? 'Income' : 'Expense', // Set type based on formData.type
        };
        
        onSubmit(transactionData, formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="inv-form">
                <label htmlFor="type">Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Invoice">Invoice</option>
                    <option value="Quotation">Quotation</option>
                </select>

                <label htmlFor="customerName">Customer Name</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Customer Name"
                />

                <label htmlFor="customerEmail">Customer Email</label>
                <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="Customer Email"
                />

                {formData.items.map((item, index) => (
                    <div key={index} className="item-row">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Description"
                        />
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Quantity"
                        />
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, e)}
                            placeholder="Price"
                        />
                    </div>
                ))}

                <button type="submit">
                    Save {formData.type}
                </button>
            </form>

            {/* Add PDF Generation */}
            <PDFDownloadLink
                document={<InvoiceDocument formData={formData} type={formData.type} transactionId="" />}
                fileName={`${formData.type}.pdf`}
            >
                {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
            </PDFDownloadLink>
        </>
    );
}
