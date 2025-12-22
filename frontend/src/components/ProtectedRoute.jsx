import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { booting, isAuthenticated } = useAuth();
  const location = useLocation();

  if (booting) {
    return (
      <div className="center-screen">
        <div className="spinner" />
        <div className="muted" style={{ marginTop: 12 }}>
          Đang tải…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
