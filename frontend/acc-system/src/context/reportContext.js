import React, { createContext, useState, useContext } from 'react';
import { generateReport, getAllReports, getReportById } from '../services/reportService';

const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const data = await getAllReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReport = async (reportData) => {
    try {
      const newReport = await generateReport(reportData);
      setReports((prev) => [...prev, newReport]);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const fetchReportById = async (id) => {
    setLoading(true);
    try {
      const report = await getReportById(id);
      return report;
    } catch (error) {
      console.error('Failed to fetch report by ID:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportContext.Provider value={{ reports, fetchAllReports, createReport, fetchReportById, loading }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);
