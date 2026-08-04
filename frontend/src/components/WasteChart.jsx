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
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  if (!chartData) {
    return <h3>Loading Chart...</h3>;
  }

  const data = {
    labels: chartData.days,

    datasets: [
      {
        label: "Waste Collected (kg)",

        data: chartData.waste,

        backgroundColor: [
          "#3B82F6",
          "#60A5FA",
          "#2563EB",
          "#1D4ED8",
          "#0EA5E9",
          "#38BDF8",
          "#2563EB",
        ],

        borderRadius: 10,
        borderSkipped: false,
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
        display: true,
        text: "Weekly Waste Collection",
        color: "#1E293B",

        font: {
          size: 20,
          weight: "bold",
        },
      },

      tooltip: {
        backgroundColor: "#1E293B",
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#475569",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "#E2E8F0",
        },

        ticks: {
          color: "#475569",
        },
      },
    },
  };

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h2>📊 Waste Analytics</h2>

          <p>Daily waste collected across all wards</p>

        </div>

        <button>Last 7 Days</button>

      </div>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}

export default WasteChart;