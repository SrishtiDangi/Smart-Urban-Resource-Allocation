import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WardMap from "../components/WardMap";
import TruckRoute from "../components/TruckRoute";

import "./WardMonitoring.css";

function WardMonitoring() {
    const [selectedWard, setSelectedWard] = useState(null);

    return (
        <div className="ward-page">

            {/* NAVBAR */}
            <Navbar />

            <div className="dashboard-body">

                {/* SIDEBAR */}
                <Sidebar />

                {/* MAIN CONTENT */}
                <main className="ward-content">

                    {/* PAGE HEADER */}
                    <div className="page-header">

                        <h1>🗺️ Ward Monitoring Center</h1>

                        <p>
                            Monitor live waste collection, overflow risk and
                            AI-powered route optimization across all city wards.
                        </p>

                    </div>


                    {/* SUMMARY CARDS */}
                    <div className="ward-summary">

                        <div className="summary-card">
                            <h2>16</h2>
                            <p>Total Wards</p>
                        </div>

                        <div className="summary-card">
                            <h2>4</h2>
                            <p>Critical</p>
                        </div>

                        <div className="summary-card">
                            <h2>6</h2>
                            <p>Warning</p>
                        </div>

                        <div className="summary-card">
                            <h2>6</h2>
                            <p>Normal</p>
                        </div>

                    </div>


                    {/* MAP + DETAILS */}
                    <div className="monitoring-layout">

                        {/* LEFT SIDE - WARD MAP */}
                        <div className="map-section">

                            <WardMap
                                selectedWard={selectedWard}
                                setSelectedWard={setSelectedWard}
                            />

                        </div>


                        {/* RIGHT SIDE */}
                        <div className="details-section">

                            {/* WARD DETAILS CARD */}
                            <div className="details-card">

                                {!selectedWard ? (

                                    /* NO WARD SELECTED */
                                    <>
                                        <h2>Select a Ward</h2>

                                        <p>
                                            Click any ward from the map to
                                            view its details.
                                        </p>
                                    </>

                                ) : (

                                    /* WARD SELECTED */
                                    <>

                                        <h2>{selectedWard.name}</h2>

                                        <p>
                                            Live AI Monitoring
                                        </p>

                                        <hr />


                                        {/* POPULATION */}
                                        <div className="detail-row">

                                            <span>
                                                Population
                                            </span>

                                            <strong>
                                                {selectedWard.population.toLocaleString()}
                                            </strong>

                                        </div>


                                        {/* WASTE */}
                                        <div className="detail-row">

                                            <span>
                                                Waste Generated
                                            </span>

                                            <strong>
                                                {selectedWard.waste}
                                            </strong>

                                        </div>


                                        {/* FILL LEVEL */}
                                        <div className="detail-row">

                                            <span>
                                                Fill Level
                                            </span>

                                            <strong>
                                                {selectedWard.fill}%
                                            </strong>

                                        </div>


                                        {/* STATUS */}
                                        <div className="detail-row">

                                            <span>
                                                Status
                                            </span>

                                            <strong
                                                className={
                                                    selectedWard.status === "critical"
                                                        ? "critical-text"
                                                        : selectedWard.status === "warning"
                                                            ? "warning-text"
                                                            : "normal-text"
                                                }
                                            >
                                                {selectedWard.status}
                                            </strong>

                                        </div>


                                        <hr />


                                        {/* AI RECOMMENDATION */}
                                        <h3>
                                            🤖 AI Recommendation
                                        </h3>

                                        <p>

                                            {selectedWard.status === "critical"
                                                ? "AI predicts this ward may overflow within the next 2 hours. Immediate garbage collection is recommended."
                                                : selectedWard.status === "warning"
                                                    ? "AI recommends scheduling garbage collection soon to prevent overflow."
                                                    : "Current collection schedule is sufficient. No immediate action required."
                                            }

                                        </p>


                                        {/* RECOMMENDATIONS */}
                                        <div className="recommendation-box">

                                            {/* TRUCK */}
                                            <div>

                                                🚛

                                                <span>
                                                    Truck Assigned :
                                                    <b> T-04</b>
                                                </span>

                                            </div>


                                            {/* ETA */}
                                            <div>

                                                ⏱

                                                <span>
                                                    ETA :
                                                    <b> 8 Minutes</b>
                                                </span>

                                            </div>


                                            {/* FUEL */}
                                            <div>

                                                ⛽

                                                <span>
                                                    Fuel Saved :
                                                    <b> 14 L</b>
                                                </span>

                                            </div>


                                            {/* MONEY */}
                                            <div>

                                                💰

                                                <span>
                                                    Cost Saved :
                                                    <b> ₹1850</b>
                                                </span>

                                            </div>


                                            {/* CO2 */}
                                            <div>

                                                🌱

                                                <span>
                                                    CO₂ Reduced :
                                                    <b> 9.2 kg</b>
                                                </span>

                                            </div>

                                        </div>

                                    </>

                                )}

                            </div>


                            {/* TRUCK ROUTE */}
                            {selectedWard && (
                                <TruckRoute
                                    selectedWard={selectedWard}
                                />
                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default WardMonitoring;