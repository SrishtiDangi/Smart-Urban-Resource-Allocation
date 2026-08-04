import { useState } from "react";
import axios from "axios";
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
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction Failed! Check Backend.");
    }

    setLoading(false);
  };

  return (
    <div className="prediction-card">

      <h2>🤖 AI Overflow Prediction</h2>

      <p>
        Enter ward details to predict whether the garbage bin
        is likely to overflow.
      </p>

      <form
        onSubmit={handleSubmit}
        className="prediction-form"
      >

        <div className="input-group">
          <label>Ward</label>

          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option
                key={i}
                value={i}
              >
                Ward {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Population</label>

          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Temperature (°C)</label>

          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Rainfall (mm)</label>

          <input
            type="number"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Holiday</label>

          <select
            name="holiday"
            value={formData.holiday}
            onChange={handleChange}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div className="input-group">
          <label>Last Collection (Hours)</label>

          <input
            type="number"
            name="last_collection_hours"
            value={formData.last_collection_hours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group full-width">
          <label>Waste Generated (kg)</label>

          <input
            type="number"
            name="waste_generated_kg"
            value={formData.waste_generated_kg}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="predict-btn"
        >
          {loading ? "Predicting..." : "🚀 Predict Overflow"}
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

          <h3>Prediction Result</h3>

          <h1>
            {result.prediction === 1
              ? "🔴 Overflow Expected"
              : "🟢 No Overflow"}
          </h1>

          <p>
            <strong>Status:</strong> {result.status}
          </p>

          <hr />

          <p>
            <strong>Priority:</strong>{" "}
            {result.prediction === 1
              ? "High"
              : "Low"}
          </p>

          <p>
            <strong>Suggested Action:</strong>{" "}
            {result.prediction === 1
              ? "Dispatch Collection Vehicle Immediately"
              : "No Immediate Action Required"}
          </p>

          <p>
            <strong>Estimated Fuel Saving:</strong>{" "}
            {result.prediction === 1
              ? "3.8 Litres"
              : "0 Litres"}
          </p>

          <p>
            <strong>Estimated Cost Saving:</strong>{" "}
            {result.prediction === 1
              ? "₹450"
              : "₹0"}
          </p>

        </div>

      )}

    </div>
  );
}

export default PredictionForm;