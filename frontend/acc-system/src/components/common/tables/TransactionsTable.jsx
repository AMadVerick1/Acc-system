import React from 'react';

export default function TransactionsTable({ headers, rows }) {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.length > 0 ? rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                )): (
                    <tr>
                        <td colSpan="7">No transactions available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
