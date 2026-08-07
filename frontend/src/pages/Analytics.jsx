import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import WasteChart from "../components/WasteChart";
import OverflowPieChart from "../components/OverflowPieChart";
import WardPerformanceChart from "../components/WardPerformanceChart";

import "./Analytics.css";

function Analytics() {
    return (
        <div className="dashboard">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <h1 className="page-title">Analytics Dashboard</h1>
                    <p className="page-subtitle">
                        Waste generation trends and ward-wise performance analysis
                    </p>

                    {/* First Row */}
                    <div className="charts-row">

                        <div className="chart-card">
                            <WasteChart />
                        </div>

                        <div className="pie-card">
                            <OverflowPieChart />
                        </div>

                    </div>

                    {/* Second Row */}
                    <div className="charts-row">

                        <div className="full-card">
                            <WardPerformanceChart />
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Analytics;