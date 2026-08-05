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

    return (
      <div className="pie-loading">
        Loading Distribution...
      </div>
    );

  }

  const data = {

    labels: ["Overflow", "Normal"],

    datasets: [

      {

        data: [

          pieData.overflow,

          pieData.normal,

        ],

        backgroundColor: [

          "#EF4444",

          "#22C55E",

        ],

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

          boxWidth: 16,

          padding: 18,

          color: "#475569",

          font: {

            size: 14,

            weight: "600",

          },

        },

      },

      tooltip: {

        backgroundColor: "#1e293b",

      },

    },

  };

  return (

    <>

      <div className="pie-header">

        <h2>🥧 Overflow Distribution</h2>

        <p>Current bin status across wards</p>

      </div>

      <div className="pie-chart">

        <Pie
          data={data}
          options={options}
        />

      </div>

    </>

  );

}

export default OverflowPieChart;