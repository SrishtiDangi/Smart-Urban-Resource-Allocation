import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Settings.css";

function Settings() {

    return (

        <div className="settings-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="settings-content">

                    <div className="page-header">

                        <h1>⚙️ System Settings</h1>

                        <p>
                            Configure AI prediction, notification preferences and smart city
                            system parameters.
                        </p>

                    </div>

                    <div className="settings-grid">

                        {/* AI */}

                        <div className="setting-card">

                            <h3>🤖 AI Prediction</h3>

                            <label>

                                Confidence Threshold

                                <input
                                    type="range"
                                    min="50"
                                    max="100"
                                    defaultValue="90"
                                />

                            </label>

                            <small>Current : 90%</small>

                        </div>

                        {/* Notifications */}

                        <div className="setting-card">

                            <h3>🔔 Notifications</h3>

                            <label>

                                <input type="checkbox" defaultChecked />

                                Email Alerts

                            </label>

                            <label>

                                <input type="checkbox" defaultChecked />

                                SMS Alerts

                            </label>

                            <label>

                                <input type="checkbox" />

                                Daily Reports

                            </label>

                        </div>

                        {/* Resources */}

                        <div className="setting-card">

                            <h3>🚛 Resource Settings</h3>

                            <label>

                                Trucks Available

                                <input
                                    type="number"
                                    defaultValue="12"
                                />

                            </label>

                            <label>

                                Workers Available

                                <input
                                    type="number"
                                    defaultValue="53"
                                />

                            </label>

                        </div>

                        {/* Account */}

                        <div className="setting-card">

                            <h3>👤 Administrator</h3>

                            <label>

                                Name

                                <input
                                    type="text"
                                    defaultValue="City Admin"
                                />

                            </label>

                            <label>

                                Email

                                <input
                                    type="email"
                                    defaultValue="admin@smartcity.gov"
                                />

                            </label>

                        </div>

                    </div>

                    <button className="save-btn">

                        Save Settings

                    </button>

                </main>

            </div>

        </div>

    );

}

export default Settings;