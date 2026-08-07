import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "./CO2Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function CO2Chart() {

  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    // Backend se baad me ayega

    setChartData({

      days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

      co2:[8,12,18,22,28,31,39]

    });

  }, []);

  if(!chartData){

    return <h3>Loading...</h3>;

  }

  const data={

    labels:chartData.days,

    datasets:[

      {

        label:"CO₂ Saved (kg)",

        data:chartData.co2,

        borderColor:"#16a34a",

        backgroundColor:"rgba(34,197,94,.18)",

        fill:true,

        tension:.4,

        pointRadius:5,

        pointBackgroundColor:"#16a34a"

      }

    ]

  };

  const options={

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

      legend:{
        display:false
      }

    },

    scales:{

      x:{

        grid:{
          display:false
        }

      },

      y:{

        beginAtZero:true,

        grid:{
          color:"#e5e7eb"
        }

      }

    }

  };

  return(

    <div className="co2-card">

      <div className="co2-header">

        <div>

          <h2>🌱 Carbon Reduction</h2>

          <p>CO₂ emissions reduced using optimized collection routes</p>

        </div>

      </div>

      <div className="co2-chart">

        <Line

          data={data}

          options={options}

        />

      </div>

    </div>

  );

}

export default CO2Chart;