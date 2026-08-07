import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import ResourceAllocation from "./pages/ResourceAllocation";
import Economics from "./pages/Economics";
import WardMonitoring from "./pages/WardMonitoring";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/prediction" element={<Prediction />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route
          path="/resource-allocation"
          element={<ResourceAllocation />}
        />

        <Route
          path="/economics"
          element={<Economics />}
        />

        <Route
          path="/ward-monitoring"
          element={<WardMonitoring />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;