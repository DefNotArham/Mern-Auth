import { create } from "zustand";
import axios from "axios";

const CLIENT_URL = "http://localhost:8000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  resetErrorMessage: () => {
    set({ error: null });
  },

  signup: async (email, password, name) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${CLIENT_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up",
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${CLIENT_URL}/verify-email`, { code });
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axios.post(`${CLIENT_URL}/login`, {
        email,
        password,
      });
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Loging in",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${CLIENT_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));
