import React, { useState } from 'react';
import { createAccount } from '../../../services/accountService';

const AccountForm = ({ onSubmit }) => {
  const [accountData, setAccountData] = useState({
    name: '',
    type: 'savings',
    category: 'assets',
    balance: 0,
  });
  const [error, setError] = useState(null); // To handle errors
  const [successMessage, setSuccessMessage] = useState(null); // For success messages

  const handleChange = (e) => {
    console.log(`Field changed: ${e.target.name}, New value: ${e.target.value}`);
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', accountData); // Log form data before submitting

    try {
      const newAccount = await createAccount(accountData); // Call API to create account
      console.log('Account created successfully:', newAccount); // Log the successful response

      setSuccessMessage('Account created successfully!');
      setAccountData({ name: '', type: 'savings', category: 'assets', balance: 0 }); // Clear form
      setError(null); // Clear any previous errors

      if (onSubmit) {
        console.log('Calling onSubmit with new account data...');
        onSubmit(newAccount); // Call the parent submit handler, if passed
      }
    } catch (error) {
      console.error('Error during account creation:', error); // Log the error details
      setError('Error creating account. Please try again.');
      setSuccessMessage(null); // Clear success message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div>
        <label>Account Name</label>
        <input
          type="text"
          name="name"
          value={accountData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Account Type</label>
        <select name="type" value={accountData.type} onChange={handleChange} required>
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select>
      </div>

      <div>
        <label>Account Category</label>
        <select name="category" value={accountData.category} onChange={handleChange} required>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
        </select>
      </div>

      <div>
        <label>Balance</label>
        <input
          type="number"
          name="balance"
          value={accountData.balance}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
};

export default AccountForm;
