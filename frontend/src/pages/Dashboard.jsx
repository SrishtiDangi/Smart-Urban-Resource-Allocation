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

                    {/* PAGE INTRO */}
                    <section className="dashboard-intro">

                        <div>
                            <span className="eyebrow">
                                ADMIN DASHBOARD
                            </span>

                            <h1>
                                Smart City
                                <br />
                                <span>Management.</span>
                            </h1>

                            <p>
                                Monitor waste, predict overflow and optimize
                                municipal resources using AI-powered insights.
                            </p>
                        </div>

                        <div className="dashboard-date">
                            <span>STATUS</span>
                            <strong>Live Monitoring</strong>
                            <small>● System operational</small>
                        </div>

                    </section>


                    {/* OVERVIEW */}
                    <section className="dashboard-section">

                        <div className="section-label">
                            <span>01</span>
                            <p>OVERVIEW</p>
                        </div>

                        <DashboardCards />

                    </section>


                    {/* ENVIRONMENT */}
                    <section className="dashboard-section">

                        <div className="section-label">
                            <span>02</span>
                            <p>ENVIRONMENT</p>
                        </div>

                        <WeatherWidget />

                    </section>


                    {/* WASTE ANALYTICS */}
                    <section className="dashboard-section">

                        <div className="section-label">
                            <span>03</span>
                            <p>WASTE ANALYTICS</p>
                        </div>

                        <div className="charts-row">

                            <div className="chart-card">
                                <WasteChart />
                            </div>

                            <div className="pie-card">
                                <OverflowPieChart />
                            </div>

                        </div>

                    </section>


                    {/* WARD MONITORING */}
                    <section className="dashboard-section">

                        <div className="section-label">
                            <span>04</span>
                            <p>WARD MONITORING</p>
                        </div>

                        <WardTable />

                    </section>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;