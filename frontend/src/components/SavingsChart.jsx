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
import "./SavingsChart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

function SavingsChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        setChartData({

            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

            savings: [420, 610, 700, 850, 920, 1100, 1280]

        });

    }, []);

    if (!chartData) {

        return <div className="loading-card">Loading...</div>;

    }

    const data = {

        labels: chartData.days,

        datasets: [

            {

                label: "Savings",

                data: chartData.savings,

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,0.12)",

                fill: true,

                tension: 0.4,

                borderWidth: 3,

                pointRadius: 4,

                pointHoverRadius: 7,

                pointBackgroundColor: "#2563eb",

                pointBorderColor: "#ffffff",

                pointBorderWidth: 2,

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {

            mode: "index",

            intersect: false,

        },

        plugins: {

            legend: {

                display: false,

            },

            tooltip: {

                backgroundColor: "#0f172a",

                titleColor: "#fff",

                bodyColor: "#fff",

                padding: 12,

            }

        },

        scales: {

            x: {

                grid: {

                    display: false,

                },

                ticks: {

                    color: "#64748b",

                }

            },

            y: {

                beginAtZero: true,

                grid: {

                    color: "#e2e8f0",

                },

                ticks: {

                    color: "#64748b",

                    callback: (value) => "₹" + value

                }

            }

        }

    };

    return (

        <div className="savings-card">

            <div className="savings-header">

                <div>

                    <h2>Operational Cost Savings</h2>

                    <p>Estimated municipal savings after AI-based route optimization</p>

                </div>

            </div>

            <div className="savings-chart">

                <Line
                    data={data}
                    options={options}
                />

            </div>

        </div>

    );

}

export default SavingsChart;