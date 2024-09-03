import React, { createContext, useState, useContext } from 'react';
import { getAllUsers, registerUser, loginUser, getUserProfile, updateUserProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const users = await getAllUsers();
      setUser(users); // Assuming user state holds the logged-in user
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
    } catch (error) {
      console.error('Failed to register user:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const loggedInUser = await loginUser(credentials);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updateData) => {
    try {
      const updatedProfile = await updateUserProfile(updateData);
      setUser(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, fetchAllUsers, register, login, fetchUserProfile, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
