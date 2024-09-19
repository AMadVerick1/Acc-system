import React, { useState } from 'react';
import Modal from 'react-modal';
import InvoiceQuotationForm from '../forms/invoiceQuotationForm.jsx';
import TransactionForm from '../forms/TransactionsForm.jsx';

export default function TransactionFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formType, setFormType] = useState('Transaction'); // Add form type state

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Transaction Form"
            className="transaction-modal"
        >
            <h2>{initialData ? 'Edit Transaction' : 'Add New Transaction'}</h2>

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
                <button
                    className={`tab-button ${formType === 'Quotation' ? 'active' : ''}`}
                    onClick={() => setFormType('Quotation')}
                >
                    Quotation
                </button>
            </div>

            {/* Conditionally render the TransactionForm or InvoiceQuotationForm based on selected type */}
            {formType === 'Transaction' ? (
                <TransactionForm
                    initialData={initialData}
                    onSubmit={(formData) => {
                        onSubmit(formData);
                        onClose(); // Close the modal after submitting
                    }}
                />
            ) : (
                <InvoiceQuotationForm
                    transactionId={initialData?.id}
                    type={formType} // Pass formType as 'Invoice' or 'Quotation'
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
