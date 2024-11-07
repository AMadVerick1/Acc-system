import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import './invQuo.css';

// Define PDF styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 10,
    },
    companyHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    companySubHeader: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 20,
    },
    companyInfo: {
        fontSize: 10,
        marginBottom: 20,
    },
    billTo: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 5,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        width: '25%',
        fontSize: 10,
    },
    totalSection: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    bankDetails: {
        marginTop: 20,
        fontSize: 10,
    },
    footerLine: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#000',
        marginVertical: 5,
    },
});

const InvoiceDocument = ({ formData, transactionId }) => (
    <Document>
        <Page className="invoice-container" style={styles.page}>
            {/* Company Information Section */}
            <View style={styles.section}>
                <Text style={styles.companyHeader}>
                    MORIPE BUSINESS TRAINING & CONSULTANT PTY LTD
                </Text>
                <Text style={styles.companySubHeader}>Enterprise Development Solutions</Text>
                <Text style={styles.companyInfo}>101 First Rd, Roda, Dasnato, 2090</Text>
                <Text style={styles.companyInfo}>Phone: 011 443 0113</Text>
                <Text style={styles.companyInfo}>Email: info@moripe.co.za</Text>
                <Text style={styles.companyInfo}>VAT Number: 123456789</Text>
            </View>

            {/* Transaction Info */}
            <View style={styles.section}>
                <Text>Invoice No: {transactionId || 'N/A'}</Text>
                <Text>Date: {new Date().toLocaleDateString()}</Text>
            </View>

            {/* Bill To Section */}
            <View style={styles.billTo}>
                <Text>Bill To:</Text>
                <Text>{formData.customerName}</Text>
                <Text>{formData.customerEmail}</Text>
            </View>

            {/* Item List */}
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
                        <Text style={styles.tableCell}>
                            {(item.quantity * item.price).toFixed(2)}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Total Section */}
            <View style={styles.totalSection}>
                <Text>Total: ${formData.total.toFixed(2)}</Text>
            </View>

            {/* Bank Details Section */}
            {/* <View style={styles.bankDetails}>
                <Text>Bank Details:</Text>
                <Text>Bank Name: {formData.bankName}</Text>
                <Text>Account Number: {formData.accountNumber}</Text>
                <Text>Branch Name: {formData.branchName}</Text>
                <Text>Branch Code: {formData.branchCode}</Text>
            </View> */}

            {/* Footer Line */}
            <View style={styles.footerLine} />
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
        branchCode: '',
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

    // Add new item
    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { description: '', quantity: 1, price: 0 }],
        }));
    };

    // Remove item
    const removeItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, items: updatedItems }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            account: formData.type, // Use type as account
            date: new Date(), // Current date
            description: formData.items.map((item) => item.description).join(', '), // Concatenate item descriptions
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
                        <button type="button" onClick={() => removeItem(index)}>
                            Remove Item
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addItem}>
                    Add Item
                </button>

                <button type="submit">Save {formData.type}</button>
            </form>
        </>
    );
}
