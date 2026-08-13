import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Brain, AlertCircle, CheckCircle2, TrendingDown, Thermometer, CloudRain, Users, Clock, Trash2, MapPin } from "lucide-react";
import PredictionHistory from "./PredictionHistory";
import ShapChart from "./ShapChart";
import "./PredictionForm.css";

function PredictionForm() {
  const [formData, setFormData] = useState({
    area: 1,
    population: "",
    temperature: "",
    rainfall: "",
    holiday: 0,
    last_collection_hours: "",
    waste_generated_kg: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8888/predict",
        formData
      );

      const data = response.data;
      setResult(data);

      // Save to history with timestamp
      const timestamp = new Date().toLocaleTimeString();
      setHistory(prev => [{ ...data, area: formData.area, timestamp }, ...prev]);

      if (data.prediction === 1) {
        toast.warning("⚠️ Overflow Expected! High priority action needed.");
      } else {
        toast.success("✅ Prediction successful. No overflow expected.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Prediction Failed! Check backend connection.");
    }

    setLoading(false);
  };

  return (
    <div className="prediction-card">

      <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Brain color="var(--primary)" /> AI Overflow Prediction
      </h2>
      <p>Enter ward details to predict whether the garbage bin is likely to overflow.</p>

      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="input-group">
          <label><MapPin size={16} /> Ward</label>
          <select name="area" value={formData.area} onChange={handleChange}>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i} value={i}>Ward {i + 1}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label><Users size={16} /> Population</label>
          <input type="number" name="population" value={formData.population} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label><Thermometer size={16} /> Temperature (°C)</label>
          <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label><CloudRain size={16} /> Rainfall (mm)</label>
          <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label><AlertCircle size={16} /> Holiday</label>
          <select name="holiday" value={formData.holiday} onChange={handleChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="input-group">
          <label><Clock size={16} /> Last Collection (Hours)</label>
          <input type="number" name="last_collection_hours" value={formData.last_collection_hours} onChange={handleChange} required />
        </div>

        <div className="input-group full-width">
          <label><Trash2 size={16} /> Waste Generated (kg)</label>
          <input type="number" name="waste_generated_kg" value={formData.waste_generated_kg} onChange={handleChange} required />
        </div>

        <button type="submit" className="predict-btn" disabled={loading}>
          {loading ? (
             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
               <div className="spinner"></div> Predicting...
             </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Brain size={18} /> Predict Overflow
            </span>
          )}
        </button>
      </form>

      {result && (

        <div
          className={
            result.prediction === 1
              ? "result danger"
              : "result safe"
          }
        >

          <h2>

            {result.prediction === 1
              ? "🔴 Overflow Expected"
              : "🟢 No Overflow"}

          </h2>

          <hr />

          <div className="result-grid">

            <div className="result-item">

              <h4>Status</h4>

              <p>{result.status}</p>

            </div>

            <div className="result-item">

              <h4>Confidence</h4>

              <p>{result.confidence}%</p>

            </div>

            <div className="result-item">

              <h4>Priority</h4>

              <p>{result.priority}</p>

            </div>

            <div className="result-item">

              <h4>Recommended Action</h4>

              <p>{result.recommended_action}</p>

            </div>

            <div className="result-item">

              <h4>Fuel Saved</h4>

              <p>{result.fuel_saved} L</p>

            </div>

            <div className="result-item">

              <h4>Money Saved</h4>

              <p>₹ {result.money_saved}</p>

            </div>

            <div className="result-item">

              <h4>CO₂ Reduced</h4>

              <p>{result.co2_saved} kg</p>

            </div>

          </div>

        </div>

      )}

      {/* SHAP Explainability */}
      {result && result.shap_explanation && (
        <ShapChart data={result.shap_explanation} />
      )}

      {/* Prediction History */}
      <PredictionHistory history={history} />

    </div>
  );
}

export default PredictionForm;