import "./PredictionHistory.css";

function PredictionHistory({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="history-card">
      <div className="history-header">
        <h3>📋 Prediction History</h3>
        <span className="history-count">{history.length} record{history.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ward</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>Priority</th>
              <th>Action</th>
              <th>Fuel Saved</th>
              <th>Money Saved</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className={item.prediction === 1 ? "row-danger" : "row-safe"}>
                <td>{history.length - idx}</td>
                <td>Ward {item.area}</td>
                <td>
                  <span className={`status-badge ${item.prediction === 1 ? "badge-danger" : "badge-safe"}`}>
                    {item.prediction === 1 ? "🔴 Overflow" : "🟢 Safe"}
                  </span>
                </td>
                <td>{item.confidence}%</td>
                <td>
                  <span className={`priority-badge priority-${item.priority?.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="action-cell">{item.recommended_action}</td>
                <td>{item.fuel_saved} L</td>
                <td>₹{item.money_saved}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PredictionHistory;
