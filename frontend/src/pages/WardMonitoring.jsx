import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./WardMonitoring.css";

function WardMonitoring() {

    const wards = [

        {
            ward: "Ward-1",
            population: 8500,
            fill: "92%",
            status: "Overflow Risk",
            priority: "High"
        },

        {
            ward: "Ward-2",
            population: 5200,
            fill: "38%",
            status: "Normal",
            priority: "Low"
        },

        {
            ward: "Ward-3",
            population: 7600,
            fill: "84%",
            status: "Overflow Risk",
            priority: "High"
        },

        {
            ward: "Ward-4",
            population: 4200,
            fill: "29%",
            status: "Normal",
            priority: "Low"
        },

        {
            ward: "Ward-5",
            population: 9600,
            fill: "98%",
            status: "Critical",
            priority: "Critical"
        }

    ];

    return (

        <div className="ward-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="ward-content">

                    <div className="page-header">

                        <h1>🗺️ Ward Monitoring</h1>

                        <p>
                            Monitor real-time waste level and overflow status across all wards.
                        </p>

                    </div>

                    <div className="ward-summary">

                        <div className="summary-card">
                            <h2>20</h2>
                            <p>Total Wards</p>
                        </div>

                        <div className="summary-card">
                            <h2>5</h2>
                            <p>Overflow Risk</p>
                        </div>

                        <div className="summary-card">
                            <h2>15</h2>
                            <p>Normal</p>
                        </div>

                        <div className="summary-card">
                            <h2>98%</h2>
                            <p>Highest Fill Level</p>
                        </div>

                    </div>

                    <div className="table-card">

                        <table>

                            <thead>

                                <tr>

                                    <th>Ward</th>
                                    <th>Population</th>
                                    <th>Fill Level</th>
                                    <th>Status</th>
                                    <th>Priority</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    wards.map((item, index) => (

                                        <tr key={index}>

                                            <td>{item.ward}</td>

                                            <td>{item.population}</td>

                                            <td>{item.fill}</td>

                                            <td>

                                                <span
                                                    className={
                                                        item.status === "Normal"
                                                            ? "badge normal"
                                                            : "badge danger"
                                                    }
                                                >
                                                    {item.status}
                                                </span>

                                            </td>

                                            <td>

                                                <span className={`priority ${item.priority.toLowerCase()}`}>
                                                    {item.priority}
                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default WardMonitoring;