import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("isAuthenticated", isAuthenticated);
  console.log("isAuthenticated", user);
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
    </Routes>
  );
}

export default App;
