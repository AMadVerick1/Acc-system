import React from 'react';
import Modal from 'react-modal';
import TransactionForm from '../forms/TransactionsForm.jsx';

export default function TransactionFormModal({ isOpen, onClose, onSubmit, initialData }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Transaction Form"
            className="transaction-modal"
        >
            <h2>{initialData ? 'Edit Transaction' : 'Add New Transaction'}</h2>
            <TransactionForm
                initialData={initialData}
                onSubmit={(formData) => {
                    onSubmit(formData);
                    onClose(); // Close the modal after submitting
                }}
            />
            <button onClick={onClose} className="btn-close">Close</button>
        </Modal>
    );
}
