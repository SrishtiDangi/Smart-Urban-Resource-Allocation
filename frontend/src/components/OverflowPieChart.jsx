import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import { getOverflowSummary } from "../services/api";

import "./OverflowPieChart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function OverflowPieChart() {
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await getOverflowSummary();
        setPieData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    load();
  }, []);

  if (!pieData) {
    return <h3>Loading...</h3>;
  }

  const data = {
    labels: ["Overflow", "Normal"],
    datasets: [
      {
        data: [pieData.overflow, pieData.normal],
        backgroundColor: ["#EF4444", "#22C55E"],
        borderColor: "#ffffff",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          boxWidth: 14,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="pie-card">

      <h3>Overflow Distribution</h3>

      <div className="pie-chart">
        <Pie data={data} options={options} />
      </div>

    </div>
  );
}

export default OverflowPieChart;