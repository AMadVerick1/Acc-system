import React, { createContext, useState, useContext } from 'react';
import { getAllPayrolls, createPayroll, updatePayroll, deletePayroll } from '../services/payrollService';

const PayrollContext = createContext();

export const PayrollContextProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPayrolls = async () => {
    setLoading(true);
    try {
      const data = await getAllPayrolls();
      setPayrolls(data);
    } catch (error) {
      console.error('Failed to fetch payrolls:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPayroll = async (payrollData) => {
    try {
      const newPayroll = await createPayroll(payrollData);
      setPayrolls((prev) => [...prev, newPayroll]);
    } catch (error) {
      console.error('Failed to add payroll:', error);
    }
  };

  const editPayroll = async (id, updateData) => {
    try {
      const updatedPayroll = await updatePayroll(id, updateData);
      setPayrolls((prev) =>
        prev.map((payroll) => (payroll.id === id ? updatedPayroll : payroll))
      );
    } catch (error) {
      console.error('Failed to update payroll:', error);
    }
  };

  const removePayroll = async (id) => {
    try {
      await deletePayroll(id);
      setPayrolls((prev) => prev.filter((payroll) => payroll.id !== id));
    } catch (error) {
      console.error('Failed to delete payroll:', error);
    }
  };

  return (
    <PayrollContext.Provider value={{ payrolls, fetchAllPayrolls, addPayroll, editPayroll, removePayroll, loading }}>
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayrolls = () => useContext(PayrollContext);
