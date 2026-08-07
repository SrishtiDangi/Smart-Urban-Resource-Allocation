import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PredictionForm from "../components/PredictionForm";

import "./Prediction.css";

function Prediction() {
    return (
        <div className="prediction-page">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="prediction-content">

                    <div className="prediction-header">

                        <h1>🤖 AI Overflow Prediction</h1>

                        <p>
                            Predict garbage bin overflow using Machine Learning based on
                            population, weather, waste generation and collection history.
                        </p>

                    </div>

                    <PredictionForm />

                </main>

            </div>

        </div>
    );
}

export default Prediction;