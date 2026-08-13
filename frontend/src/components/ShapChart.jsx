import "./ShapChart.css";

function ShapChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxImpact = Math.max(...data.map((d) => d.impact_pct));

  return (
    <div className="shap-card">
      <div className="shap-header">
        <div className="shap-title-group">
          <span className="shap-icon">🧠</span>
          <div>
            <h3>Why did the AI predict this?</h3>
            <p>Feature impact on this prediction (SHAP values)</p>
          </div>
        </div>
        <div className="shap-badge">AI Explainability</div>
      </div>

      <div className="shap-bars">
        {data.map((item, idx) => {
          const isPositive = item.shap > 0; // pushes toward overflow
          const barWidth = maxImpact > 0 ? (item.impact_pct / maxImpact) * 100 : 0;

          return (
            <div className="shap-row" key={idx}>
              <div className="shap-label">
                <span className="shap-feature">{item.feature}</span>
                <span className="shap-value-tag">= {item.value}</span>
              </div>

              <div className="shap-bar-wrap">
                <div
                  className={`shap-bar ${isPositive ? "bar-danger" : "bar-safe"}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              <div className="shap-meta">
                <span className={`shap-pct ${isPositive ? "text-danger" : "text-safe"}`}>
                  {item.impact_pct}%
                </span>
                <span className={`shap-direction ${isPositive ? "text-danger" : "text-safe"}`}>
                  {isPositive ? "↑ pushes overflow" : "↓ reduces overflow"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shap-legend">
        <span className="legend-item danger">
          <span className="legend-dot dot-danger"></span> Increases overflow risk
        </span>
        <span className="legend-item safe">
          <span className="legend-dot dot-safe"></span> Reduces overflow risk
        </span>
      </div>
    </div>
  );
}

export default ShapChart;
