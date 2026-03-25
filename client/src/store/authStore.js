import { create } from "zustand";
import axios from "axios";
import ResetPassword from "../pages/ResetPassword";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/auth"
    : "api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  resetErrorMessage: () => {
    set({ error: null, successMessage: null });
  },

  signup: async (email, password, name) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
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
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        isLoading: false,
        user: response.data.user,
        isAuthenticated: false,
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
      const response = await axios.post(`${API_URL}/login`, {
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
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({
        isLoading: false,
        successMessage: response.data.message || "Password reset email sent",
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        successMessage: null,
        error: error.response?.data?.message || "Error sending reset email",
      });
      throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        successMessage: null,
      });
    } catch (error) {
      set({ error: error.response.data.message });
      console.log(error);
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });

      set({
        isLoading: false,
        successMessage: "Password reset successfully",
        user: response.data.user,
        error: null,
      });

      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        successMessage: null,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
