import React from 'react';
import { AuthContextProvider } from './authContext';
import { TransactionContextProvider } from './transactionContext';
import { BudgetContextProvider } from './budgetContext';
import { AccountContextProvider } from './accountContext';
import { ReportContextProvider } from './reportContext';
import { InvoiceQuotationContextProvider } from './invoiceQuotationContext';

const DataContextProvider = ({ children }) => (
  <TransactionContextProvider>
    <BudgetContextProvider>
      <AccountContextProvider>
        <InvoiceQuotationContextProvider>
          {children}
        </InvoiceQuotationContextProvider>
      </AccountContextProvider>
    </BudgetContextProvider>
  </TransactionContextProvider>
  
);

const GlobalStateProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <ReportContextProvider>
          {children}
        </ReportContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  );
};

export default GlobalStateProvider;
