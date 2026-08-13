import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import ResourceAllocation from "./pages/ResourceAllocation";
import Economics from "./pages/Economics";
import WardMonitoring from "./pages/WardMonitoring";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import HistoryPage from "./pages/HistoryPage";

// ─── Protected Route ───────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/prediction" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/resource-allocation" element={<ProtectedRoute><ResourceAllocation /></ProtectedRoute>} />
          <Route path="/economics" element={<ProtectedRoute><Economics /></ProtectedRoute>} />
          <Route path="/ward-monitoring" element={<ProtectedRoute><WardMonitoring /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        {/* Global Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;