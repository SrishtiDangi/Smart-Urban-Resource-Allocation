import { useState } from "react";
import axios from "axios";

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
      alert("Prediction Failed!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Smart Urban Resource Allocation
      </h2>

      <form onSubmit={handleSubmit}>

        <label>Area</label>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i}>
              Ward-{i + 1}
            </option>
          ))}
        </select>

        <br /><br />

        <label>Population</label>
        <input
          type="number"
          name="population"
          value={formData.population}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Temperature</label>
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Rainfall</label>
        <input
          type="number"
          name="rainfall"
          value={formData.rainfall}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Holiday</label>
        <select
          name="holiday"
          value={formData.holiday}
          onChange={handleChange}
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>

        <br /><br />

        <label>Last Collection Hours</label>
        <input
          type="number"
          name="last_collection_hours"
          value={formData.last_collection_hours}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Waste Generated (kg)</label>
        <input
          type="number"
          name="waste_generated_kg"
          value={formData.waste_generated_kg}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Predicting..." : "Predict Overflow"}
        </button>

      </form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            background:
              result.prediction === 1
                ? "#ffe5e5"
                : "#e7ffe7",
          }}
        >
          <h3>Prediction Result</h3>

          <h2>
            {result.prediction === 1
              ? "🔴 Overflow Expected"
              : "🟢 No Overflow"}
          </h2>

          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;