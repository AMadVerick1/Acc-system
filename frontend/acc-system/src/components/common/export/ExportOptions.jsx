import React from 'react';
import './export.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ExportOptions({ data }) {
    // Function to export as PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = Object.keys(data[0]);
        const tableRows = data.map(item => Object.values(item));
        
        // Add title to PDF
        doc.text('Exported Data', 14, 15);
        
        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        
        doc.save('exported_data.pdf');
    };

    // Function to export to Excel
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        // Download the Excel file
        XLSX.writeFile(workbook, 'exported_data.xlsx');
    };

    return (
        <div className="export-options">
            <button onClick={exportPDF}>Export as PDF</button>
            <button onClick={exportExcel}>Export to Excel</button>
        </div>
    );
}
