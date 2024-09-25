const Account = require('../models/accountModels');

const getAllAccounts = async () => {
  return await Account.find();
};

const getAccountById = async (accountId) => {
  const account = await Account.findById(accountId);
  if (!account) {
    throw new Error('Account not found');
  }
  return account;
}

const createAccount = async (accountData) => {
  const { name, type, category, balance } = accountData;

  const newAccount = new Account({
    name,
    type,
    category,
    balance,
  });

  return await newAccount.save();
};

// services/accountService.js
const updateAccount = async (accountId, updateData) => {
  if (!updateData || typeof updateData !== 'object') {
    throw new Error('Invalid update data');
  }

  console.log('Updating account in database with data:', updateData); // Debugging log

  const account = await Account.findByIdAndUpdate(accountId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!account) {
    throw new Error('Account not found');
  }

  return account;
};

const deleteAccount = async (accountId) => {
  const account = await Account.findByIdAndDelete(accountId);

  if (!account) {
    throw new Error('Account not found');
  }

  return account;
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};
