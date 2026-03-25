import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/forgot-password"
        element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
