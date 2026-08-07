import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./ResourceAllocation.css";

function ResourceAllocation() {

    const allocations = [

        {
            ward: "Ward-1",
            priority: "High",
            trucks: 3,
            workers: 12,
            status: "Dispatched"
        },

        {
            ward: "Ward-2",
            priority: "Low",
            trucks: 1,
            workers: 5,
            status: "Scheduled"
        },

        {
            ward: "Ward-3",
            priority: "Critical",
            trucks: 4,
            workers: 18,
            status: "In Progress"
        },

        {
            ward: "Ward-4",
            priority: "Medium",
            trucks: 2,
            workers: 8,
            status: "Scheduled"
        },

        {
            ward: "Ward-5",
            priority: "High",
            trucks: 3,
            workers: 10,
            status: "Completed"
        }

    ];

    return (

        <div className="resource-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="resource-content">

                    <div className="page-header">

                        <h1>🚛 Resource Allocation Center</h1>

                        <p>
                            AI recommends truck deployment and manpower allocation
                            based on overflow prediction and ward priority.
                        </p>

                    </div>

                    <div className="resource-summary">

                        <div className="summary-card">
                            <h2>12</h2>
                            <p>Total Trucks</p>
                        </div>

                        <div className="summary-card">
                            <h2>53</h2>
                            <p>Workers Assigned</p>
                        </div>

                        <div className="summary-card">
                            <h2>5</h2>
                            <p>Active Wards</p>
                        </div>

                        <div className="summary-card">
                            <h2>96%</h2>
                            <p>Allocation Efficiency</p>
                        </div>

                    </div>

                    <div className="table-card">

                        <table>

                            <thead>

                                <tr>

                                    <th>Ward</th>
                                    <th>Priority</th>
                                    <th>Trucks</th>
                                    <th>Workers</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    allocations.map((item, index) => (

                                        <tr key={index}>

                                            <td>{item.ward}</td>

                                            <td>

                                                <span className={`priority ${item.priority.toLowerCase()}`}>
                                                    {item.priority}
                                                </span>

                                            </td>

                                            <td>{item.trucks}</td>

                                            <td>{item.workers}</td>

                                            <td>{item.status}</td>

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

export default ResourceAllocation;