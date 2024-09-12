import React, { useState } from 'react';

export default PayrollForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    salary: 0,
    tax: 0,
    deductions: 0,
    netPay: 0,
    paymentDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="employeeName">Employee Name:</label>
      <input type="text" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleChange} required /><br /><br />

      <label htmlFor="salary">Salary:</label>
      <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required /><br /><br />

      <label htmlFor="tax">Tax:</label>
      <input type="number" id="tax" name="tax" value={formData.tax} onChange={handleChange} /><br /><br />

      <label htmlFor="deductions">Deductions:</label>
      <input type="number" id="deductions" name="deductions" value={formData.deductions} onChange={handleChange} /><br /><br />

      <label htmlFor="netPay">Net Pay:</label>
      <input type="number" id="netPay" name="netPay" value={formData.netPay} onChange={handleChange} required /><br /><br />

      <label htmlFor="paymentDate">Payment Date:</label>
      <input type="date" id="paymentDate" name="paymentDate" value={formData.paymentDate} onChange={handleChange} /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};