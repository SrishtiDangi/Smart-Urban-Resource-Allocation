import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getPredictionHistory } from "../services/api";
import "./HistoryPage.css";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | overflow | safe

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getPredictionHistory(100);
      setHistory(res.data);
    } catch {
      toast.error("❌ Could not load history. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const filtered = history.filter((h) => {
    if (filter === "overflow") return h.will_overflow;
    if (filter === "safe") return !h.will_overflow;
    return true;
  });

  const overflowCount = history.filter((h) => h.will_overflow).length;
  const safeCount     = history.filter((h) => !h.will_overflow).length;

  return (
    <div className="history-page">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="history-content">

          {/* Header */}
          <div className="page-header">
            <h1>📋 Prediction History</h1>
            <p>All predictions saved in the database across sessions.</p>
          </div>

          {/* Summary KPIs */}
          <div className="history-kpis">
            <div className="kpi-card kpi-total">
              <span className="kpi-icon">🔢</span>
              <div>
                <h4>{history.length}</h4>
                <p>Total Predictions</p>
              </div>
            </div>
            <div className="kpi-card kpi-danger">
              <span className="kpi-icon">🔴</span>
              <div>
                <h4>{overflowCount}</h4>
                <p>Overflow Cases</p>
              </div>
            </div>
            <div className="kpi-card kpi-safe">
              <span className="kpi-icon">🟢</span>
              <div>
                <h4>{safeCount}</h4>
                <p>Safe Cases</p>
              </div>
            </div>
            <div className="kpi-card kpi-accuracy">
              <span className="kpi-icon">🎯</span>
              <div>
                <h4>
                  {history.length > 0
                    ? Math.round((overflowCount / history.length) * 100)
                    : 0}%
                </h4>
                <p>Overflow Rate</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="history-filters">
            {["all", "overflow", "safe"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "📋 All" : f === "overflow" ? "🔴 Overflow" : "🟢 Safe"}
              </button>
            ))}
            <button className="refresh-btn" onClick={fetchHistory}>
              🔄 Refresh
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="history-loading">
              <div className="loader-ring-sm"><div/><div/><div/><div/></div>
              <p>Loading history...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="history-empty">
              <span>🗂️</span>
              <h3>No predictions yet</h3>
              <p>Run a prediction from the AI Prediction page to see history here.</p>
            </div>
          ) : (
            <div className="history-table-wrap">
              <table className="hist-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                    <th>Confidence</th>
                    <th>Temp (°C)</th>
                    <th>Rainfall (mm)</th>
                    <th>Holiday</th>
                    <th>Hrs Since Coll.</th>
                    <th>Waste (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={row.id} className={row.will_overflow ? "tr-danger" : "tr-safe"}>
                      <td>{idx + 1}</td>
                      <td>{row.timestamp}</td>
                      <td>
                        <span className={`badge ${row.will_overflow ? "badge-overflow" : "badge-safe"}`}>
                          {row.will_overflow ? "🔴 Overflow" : "🟢 Safe"}
                        </span>
                      </td>
                      <td><strong>{row.confidence}%</strong></td>
                      <td>{row.temperature}°C</td>
                      <td>{row.rainfall} mm</td>
                      <td>{row.is_holiday ? "Yes" : "No"}</td>
                      <td>{row.hours_since_collection}h</td>
                      <td>{row.waste_kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default HistoryPage;
