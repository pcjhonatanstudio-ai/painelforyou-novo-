import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WhatsApp from "./pages/WhatsApp";
import Conversations from "./pages/Conversations";
import IA from "./pages/IA";
import Companies from "./pages/Companies";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import MainLayout from "./components/layout/MainLayout";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          <div className="mt-4 text-gold font-medium animate-pulse">ForYouscale</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/whatsapp" element={<WhatsApp />} />
                    <Route path="/conversations" element={<Conversations />} />
                    <Route path="/ia" element={<IA />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" theme="dark" />
      </AuthProvider>
    </Router>
  );
}
