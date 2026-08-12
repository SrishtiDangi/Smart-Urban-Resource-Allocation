import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./EconomicsChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function EconomicsChart() {
  // Hardcoded for demo - ideally fetched from API
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Fuel Saved (Liters)",
        data: [12, 19, 15, 22, 30, 25, 32],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Money Saved (₹100s)",
        data: [12.6, 19.9, 15.7, 23.1, 31.5, 26.2, 33.6],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: '#475569',
            font: {
                family: "'Inter', sans-serif",
                size: 12
            }
        }
      },
      tooltip: {
        backgroundColor: "#1e293b",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e2e8f0" },
        ticks: { color: "#64748b" },
      },
    },
  };

  return (
    <div className="economics-chart-container">
      <div className="chart-header">
        <div>
          <h2>💰 Economics & Optimization</h2>
          <p>Savings Tracking</p>
        </div>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default EconomicsChart;
