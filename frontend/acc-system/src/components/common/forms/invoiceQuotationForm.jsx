import React, { useState } from 'react';
import { createInvoiceQuotation } from '../../../services/invoiceQuotationService'; // Service for handling invoice/quotation

export default function InvoiceQuotationForm({ transactionId, type }) {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        type: type,
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createInvoiceQuotation({ ...formData, transactionId });
        console.log('Invoice/Quotation created:', response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" />
            <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} placeholder="Customer Email" />

            {formData.items.map((item, index) => (
                <div key={index}>
                    <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} placeholder="Description" />
                    <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} placeholder="Quantity" />
                    <input type="number" name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} placeholder="Price" />
                </div>
            ))}

            <button type="button" onClick={handleAddItem}>Add Item</button>
            <button type="submit">Create {type}</button>
        </form>
    );
}
