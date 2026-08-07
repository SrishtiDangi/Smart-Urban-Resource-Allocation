import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import WasteChart from "../components/WasteChart";
import OverflowPieChart from "../components/OverflowPieChart";
import WardTable from "../components/WardTable";
import WeatherWidget from "../components/WeatherWidget";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    {/* KPI Cards */}
                    <DashboardCards />
                    <WeatherWidget />
                    {/* Charts */}
                    <div className="charts-row">

                        <div className="chart-card">
                            <WasteChart />
                        </div>

                        <div className="pie-card">
                            <OverflowPieChart />
                        </div>

                    </div>

                    {/* Ward Monitoring */}
                    <WardTable />

                </main>

            </div>

        </div>
    );
}

export default Dashboard;