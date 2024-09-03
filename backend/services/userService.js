const User = require('../models/userModels');

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserProfile = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true, // Ensures that model validators are applied during update
  }).select('-password');

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
