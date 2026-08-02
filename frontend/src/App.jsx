import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard")
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (!dashboard) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚛 Smart Urban Resource Allocation Platform</h1>

      <h2>Dashboard</h2>

      <p>Total Bins: {dashboard.total_bins}</p>
      <p>Overflow Bins: {dashboard.overflow_bins}</p>
      <p>Fuel Saved: {dashboard.fuel_saved}%</p>
      <p>Money Saved: ₹{dashboard.money_saved}</p>
    </div>
  );
}

export default App;