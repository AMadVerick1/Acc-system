import React from 'react';
import { AuthContextProvider } from './authContext';
import { TransactionContextProvider } from './transactionContext';
import { BudgetContextProvider } from './budgetContext';
import { AccountContextProvider } from './accountContext';
import { ReportContextProvider } from './reportContext';

const DataContextProvider = ({ children }) => (
  <TransactionContextProvider>
    <BudgetContextProvider>
      <AccountContextProvider>
        {children}
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
