import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function OverflowPieChart() {

  const data = {

    labels: [
      "Overflow",
      "Normal"
    ],

    datasets: [

      {

        data: [
          26,
          124
        ],

        backgroundColor: [

          "#ef4444",
          "#22c55e"

        ]

      }

    ]

  };

  return (

    <div
      style={{
        background:"white",
        padding:"20px",
        borderRadius:"12px",
        marginTop:"30px",
        boxShadow:"0 0 10px rgba(0,0,0,.15)"
      }}
    >

      <Pie data={data}/>

    </div>

  )

}

export default OverflowPieChart;