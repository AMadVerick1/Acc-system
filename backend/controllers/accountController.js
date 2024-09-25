const accountService = require('../services/accountService');

const getAccounts = async (req, res) => {
  try {
    const accounts = await accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAccount = async (req, res) => {
    try {
        const account = await accountService.findById(req.params.id);
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAccount = async (req, res) => {
  try {
    const account = await accountService.createAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    // Get account ID from URL params and update data from request body
    const accountId = req.params.id;
    const updateData = req.body;

    // Call the service layer to update the account
    const updatedAccount = await accountService.updateAccount(accountId, updateData);

    // Send success response with the updated account
    res.status(200).json(updatedAccount);
  } catch (error) {
    // Send error response if any error occurs
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
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
