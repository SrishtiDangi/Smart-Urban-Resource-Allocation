import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { getWasteTrend } from "../services/api";
import "./WasteChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WasteChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getWasteTrend();
        setChartData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, []);

  if (!chartData) {
    return (
      <div className="chart-loading">
        Loading Waste Analytics...
      </div>
    );
  }

  const data = {
    labels: chartData.days,

    datasets: [
      {
        label: "Waste Collected (kg)",

        data: chartData.waste,

        backgroundColor: "#2563eb",

        borderRadius: 10,

        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#1e293b",
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#64748b",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#64748b",
        },

        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  return (
    <>
      <div className="chart-header">

        <div>

          <h2>📊 Waste Analytics</h2>

          <p>Weekly Waste Collection</p>

        </div>

        <button>Last 7 Days</button>

      </div>

      <div className="chart-container">

        <Bar
          data={data}
          options={options}
        />

      </div>
    </>
  );
}

export default WasteChart;