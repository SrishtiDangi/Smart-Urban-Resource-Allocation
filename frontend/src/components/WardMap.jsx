import { useEffect, useState } from "react";
import { getWardData } from "../services/api";
import "./WardMap.css";

function WardMap({ selectedWard, setSelectedWard }) {

    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchWards() {

            try {

                const response = await getWardData();

                setWards(response.data);

                if (response.data.length > 0) {
                    setSelectedWard(response.data[0]);
                }

            } catch (err) {

                console.error("Failed to fetch wards:", err);

                setError("Unable to load ward data.");

            } finally {

                setLoading(false);

            }

        }

        fetchWards();

    }, []);


    if (loading) {

        return (

            <div className="ward-map-card">

                <div className="ward-map-header">

                    <div>

                        <h2>🗺️ Smart Ward Map</h2>

                        <p>
                            Loading ward data...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="ward-map-card">

                <div className="ward-map-header">

                    <div>

                        <h2>🗺️ Smart Ward Map</h2>

                        <p>
                            ⚠️ {error}
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="ward-map-card">

            {/* HEADER */}

            <div className="ward-map-header">

                <div>

                    <h2>🗺️ Smart Ward Map</h2>

                    <p>
                        Select a ward to view detailed analytics
                    </p>

                </div>

            </div>


            {/* WARD GRID */}

            <div className="ward-grid">

                {wards.map((ward) => (

                    <div
                        key={ward.id}
                        className={`
                            ward-box
                            ${ward.status}
                            ${selectedWard?.id === ward.id
                                ? "selected"
                                : ""
                            }
                        `}
                        onClick={() => setSelectedWard(ward)}
                    >

                        {/* WARD NAME */}

                        <h3>
                            {ward.name}
                        </h3>


                        {/* FILL */}

                        <span className="fill">

                            {ward.fill}%

                        </span>


                        {/* PROGRESS BAR */}

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${ward.fill}%`
                                }}
                            ></div>

                        </div>


                        {/* WASTE */}

                        <p>
                            {ward.waste}
                        </p>

                    </div>

                ))}

            </div>


            {/* LEGEND */}

            <div className="legend">

                <div>

                    <span className="green"></span>

                    Normal

                </div>


                <div>

                    <span className="orange"></span>

                    Warning

                </div>


                <div>

                    <span className="red"></span>

                    Critical

                </div>

            </div>

        </div>

    );

}

export default WardMap;