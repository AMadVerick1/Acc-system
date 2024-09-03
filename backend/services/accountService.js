const Account = require('../models/accountModels');

const getAllAccounts = async (userId) => {
  return await Account.find({ user: userId });
};

const createAccount = async (accountData, userId) => {
  const { name, balance, accountType } = accountData;

  const newAccount = new Account({
    user: userId,
    name,
    balance,
    accountType,
  });

  return await newAccount.save();
};

const updateAccount = async (accountId, updateData) => {
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
  createAccount,
  updateAccount,
  deleteAccount,
};
