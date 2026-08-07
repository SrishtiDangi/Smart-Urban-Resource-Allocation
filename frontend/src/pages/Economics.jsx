import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import SavingsChart from "../components/SavingsChart";
import CO2Chart from "../components/CO2Chart";

import "./Economics.css";

function Economics() {
    return (
        <div className="economics-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="economics-content">

                    <div className="page-header">
                        <h1>💰 Economic Analysis</h1>
                        <p>
                            Financial savings and environmental impact generated through
                            AI-based smart waste collection.
                        </p>
                    </div>

                    <div className="economics-grid">

                        <div className="economics-card">
                            <SavingsChart />
                        </div>

                        <div className="economics-card">
                            <CO2Chart />
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Economics;