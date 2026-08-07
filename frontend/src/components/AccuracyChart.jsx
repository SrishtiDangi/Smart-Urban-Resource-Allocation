import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "./AccuracyChart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function AccuracyChart() {

    const data = {

        labels: [
            "Model V1",
            "V2",
            "V3",
            "V4",
            "Current"
        ],

        datasets: [

            {

                label: "Accuracy (%)",

                data: [82, 86, 89, 92, 94.2],

                borderColor: "#8b5cf6",

                backgroundColor: "rgba(139,92,246,.15)",

                fill: true,

                tension: .4,

                pointRadius: 6,

                pointHoverRadius: 9,

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                min: 75,

                max: 100,

                grid: {
                    color: "#e5e7eb"
                }

            },

            x: {

                grid: {
                    display: false
                }

            }

        }

    };

    return (

        <div className="accuracy-card">

            <div className="accuracy-header">

                <div>

                    <h2>🎯 Model Accuracy Trend</h2>

                    <p>Performance improvement across model versions</p>

                </div>

            </div>

            <div className="accuracy-chart">

                <Line

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}

export default AccuracyChart;