import "./WardDetails.css";

function WardDetails({ ward }) {

    if (!ward) {

        return (

            <div className="details-card">

                <h2>Select a Ward</h2>

                <p>Click any ward from the left to view details.</p>

            </div>

        );

    }

    return (

        <div className="details-card">

            <h2>{ward.name}</h2>

            <p className="subtitle">
                AI Monitoring Dashboard
            </p>

            <div className="detail-row">

                <span>Population</span>

                <strong>{ward.population}</strong>

            </div>

            <div className="detail-row">

                <span>Waste Collected</span>

                <strong>{ward.waste}</strong>

            </div>

            <div className="detail-row">

                <span>Status</span>

                <strong
                    className={
                        ward.status === "Critical"
                            ? "critical"
                            : ward.status === "Overflow"
                                ? "overflow"
                                : "normal"
                    }
                >
                    {ward.status}
                </strong>

            </div>

            <div className="detail-row">

                <span>Priority</span>

                <strong>{ward.priority}</strong>

            </div>

            <div className="recommendation">

                <h3>🤖 AI Recommendation</h3>

                <p>

                    {

                        ward.status === "Critical"

                            ? "Deploy 2 garbage trucks immediately and schedule collection within 1 hour."

                            : ward.status === "Overflow"

                                ? "Assign one additional vehicle to avoid overflow."

                                : "Current collection schedule is sufficient."

                    }

                </p>

            </div>

        </div>

    );

}

export default WardDetails;