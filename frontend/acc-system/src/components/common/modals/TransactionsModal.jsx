import React, { useState } from 'react';
import Modal from 'react-modal';
import InvoiceQuotationForm from '../forms/invoiceQuotationForm.jsx';
import TransactionForm from '../forms/TransactionsForm.jsx';

export default function TransactionFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formType, setFormType] = useState('Invoice'); // Set default to 'Invoice'
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Transaction Form"
            className="transaction-modal"
        >
            <h2>{initialData ? 'Generate Invoice' : 'Add New Transaction'}</h2>

            {/* Form type selection buttons */}
            <div className="form-type-selector">
                <button
                    className={`tab-button ${formType === 'Transaction' ? 'active' : ''}`}
                    onClick={() => setFormType('Transaction')}
                >
                    Transaction
                </button>
                <button
                    className={`tab-button ${formType === 'Invoice' ? 'active' : ''}`}
                    onClick={() => setFormType('Invoice')}
                >
                    Invoice
                </button>
            </div>

            {/* Conditionally render the TransactionForm or InvoiceQuotationForm based on selected type */}
            {formType === 'Transaction' ? (
                <TransactionForm
                    initialData={initialData}
                    onSubmit={(formData) => {
                        console.log('Submitting formData from TransactionFormModal:', formData);
                        onSubmit(formData);
                        onClose(); // Close the modal after submitting
                    }}
                />
            ) : (
                <InvoiceQuotationForm
                    transactionId={initialData?.id}
                    type={formType} // Pass formType as 'Invoice'
                    onSubmit={(formData) => {
                        onSubmit(formData);
                        onClose(); // Close the modal after submitting
                    }}
                />
            )}

            <button onClick={onClose} className="btn-close">Close</button>
        </Modal>
    );
}
