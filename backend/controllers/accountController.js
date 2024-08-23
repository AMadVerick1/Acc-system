const accountService = require('../services/accountService');

const getAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts(req.user.id);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body, req.user.id);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const updatedAccount = await accountService.updateAccount(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await accountService.deleteAccount(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
