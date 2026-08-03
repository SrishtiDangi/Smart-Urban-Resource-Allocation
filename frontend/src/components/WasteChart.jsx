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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WasteChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Waste Collected (kg)",
        data: [220, 250, 240, 280, 310, 290, 330],
        backgroundColor: "#2563eb",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Waste Collection",
      },
    },
  };

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default WasteChart;