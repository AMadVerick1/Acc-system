import React, { useState } from 'react';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'profit_loss',
    data: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Report Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br /><br />

      <label htmlFor="type">Report Type:</label>
      <select id="type" name="type" value={formData.type} onChange={handleChange} required>
        <option value="Profit_Loss">Profit & Loss</option>
        <option value="Balance_Sheet">Balance Sheet</option>
        <option value="Cash_Flow">Cash Flow</option>
        <option value="Income_Statement">Cash Flow</option>
        <option value="VAT">VAT</option>
      </select><br /><br />

      <label htmlFor="data">Report Data (JSON):</label>
      <textarea id="data" name="data" value={formData.data} onChange={handleChange} rows="5" required></textarea><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReportForm;
