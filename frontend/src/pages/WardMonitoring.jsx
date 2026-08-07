import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WardMap from "../components/WardMap";
import TruckRoute from "../components/TruckRoute";

import "./WardMonitoring.css";

function WardMonitoring() {

    const [selectedWard, setSelectedWard] = useState({

        id: 1,

        name: "Ward-1",

        population: 8500,

        fill: 92,

        status: "Critical",

        waste: "420 kg",

        distance: 8.4,

        eta: 8,

        fuelSaved: 14,

        costSaved: 1850,

        truck: "T-04"

    });

    return (

        <div className="ward-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="ward-content">

                    {/* PAGE HEADER */}

                    <div className="page-header">

                        <h1>🗺️ Ward Monitoring Center</h1>

                        <p>

                            Monitor live waste collection, overflow risk and AI-powered
                            route optimization across all city wards.

                        </p>

                    </div>

                    {/* SUMMARY */}

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

                        {/* LEFT */}

                        <div className="map-section">

                            <WardMap
                                selectedWard={selectedWard}
                                setSelectedWard={setSelectedWard}
                            />

                        </div>

                        {/* RIGHT */}

                        <div className="details-section">

                            <div className="details-card">

                                <h2>{selectedWard.name}</h2>

                                <p>Live AI Monitoring</p>

                                <hr />

                                <div className="detail-row">

                                    <span>Population</span>

                                    <strong>
                                        {selectedWard.population.toLocaleString()}
                                    </strong>

                                </div>

                                <div className="detail-row">

                                    <span>Waste Generated</span>

                                    <strong>{selectedWard.waste}</strong>

                                </div>

                                <div className="detail-row">

                                    <span>Fill Level</span>

                                    <strong>{selectedWard.fill}%</strong>

                                </div>

                                <div className="detail-row">

                                    <span>Status</span>

                                    <strong
                                        className={
                                            selectedWard.status === "Critical"
                                                ? "critical-text"
                                                : selectedWard.status === "Warning"
                                                    ? "warning-text"
                                                    : "normal-text"
                                        }
                                    >

                                        {selectedWard.status}

                                    </strong>

                                </div>

                                <hr />

                                <h3>🤖 AI Recommendation</h3>

                                <p>

                                    AI predicts this ward may overflow within
                                    the next <b>2 hours</b>. Immediate garbage
                                    collection is recommended.

                                </p>

                                <div className="recommendation-box">

                                    <div>

                                        🚛

                                        <span>

                                            Truck Assigned :
                                            <b> T-04</b>

                                        </span>

                                    </div>

                                    <div>

                                        ⏱

                                        <span>

                                            ETA :
                                            <b> 8 Minutes</b>

                                        </span>

                                    </div>

                                    <div>

                                        ⛽

                                        <span>

                                            Fuel Saved :
                                            <b> 14 L</b>

                                        </span>

                                    </div>

                                    <div>

                                        💰

                                        <span>

                                            Cost Saved :
                                            <b> ₹1850</b>

                                        </span>

                                    </div>

                                    <div>

                                        🌱

                                        <span>

                                            CO₂ Reduced :
                                            <b> 9.2 kg</b>

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* ROUTE */}

                            <TruckRoute selectedWard={selectedWard} />

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default WardMonitoring;