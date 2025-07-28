import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentPage";
import LoginRegister from "./pages/LoginRegister";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <ThemeToggle />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doc/:id" element={<DocumentPage />} />
              <Route path="/login" element={<LoginRegister />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
export default App;