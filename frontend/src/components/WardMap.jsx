import "./WardMap.css";

function WardMap({ selectedWard, setSelectedWard }) {

    const wards = [

        {
            id: 1,
            name: "Ward-1",
            population: 8500,
            fill: 92,
            status: "critical",
            waste: "420 kg"
        },

        {
            id: 2,
            name: "Ward-2",
            population: 5200,
            fill: 38,
            status: "normal",
            waste: "180 kg"
        },

        {
            id: 3,
            name: "Ward-3",
            population: 7300,
            fill: 84,
            status: "warning",
            waste: "390 kg"
        },

        {
            id: 4,
            name: "Ward-4",
            population: 4100,
            fill: 28,
            status: "normal",
            waste: "150 kg"
        },

        {
            id: 5,
            name: "Ward-5",
            population: 9600,
            fill: 98,
            status: "critical",
            waste: "470 kg"
        },

        {
            id: 6,
            name: "Ward-6",
            population: 6900,
            fill: 72,
            status: "warning",
            waste: "340 kg"
        },

        {
            id: 7,
            name: "Ward-7",
            population: 5000,
            fill: 46,
            status: "normal",
            waste: "210 kg"
        },

        {
            id: 8,
            name: "Ward-8",
            population: 7600,
            fill: 81,
            status: "warning",
            waste: "360 kg"
        },

        {
            id: 9,
            name: "Ward-9",
            population: 6100,
            fill: 54,
            status: "normal",
            waste: "240 kg"
        },

        {
            id: 10,
            name: "Ward-10",
            population: 8200,
            fill: 95,
            status: "critical",
            waste: "440 kg"
        },

        {
            id: 11,
            name: "Ward-11",
            population: 4700,
            fill: 40,
            status: "normal",
            waste: "170 kg"
        },

        {
            id: 12,
            name: "Ward-12",
            population: 7800,
            fill: 76,
            status: "warning",
            waste: "355 kg"
        },

        {
            id: 13,
            name: "Ward-13",
            population: 8300,
            fill: 87,
            status: "warning",
            waste: "401 kg"
        },

        {
            id: 14,
            name: "Ward-14",
            population: 4400,
            fill: 25,
            status: "normal",
            waste: "120 kg"
        },

        {
            id: 15,
            name: "Ward-15",
            population: 9900,
            fill: 99,
            status: "critical",
            waste: "490 kg"
        },

        {
            id: 16,
            name: "Ward-16",
            population: 6700,
            fill: 61,
            status: "warning",
            waste: "295 kg"
        }

    ];

    return (

        <div className="ward-map-card">

            <div className="ward-map-header">

                <div>

                    <h2>🗺️ Smart Ward Map</h2>

                    <p>Select a ward to view detailed analytics</p>

                </div>

            </div>

            <div className="ward-grid">

                {

                    wards.map((ward) => (

                        <div

                            key={ward.id}

                            className={`ward-box
                            ${ward.status}
                            ${selectedWard?.id === ward.id ? "selected" : ""}`}

                            onClick={() => setSelectedWard(ward)}

                        >

                            <h3>{ward.name}</h3>

                            <span className="fill">

                                {ward.fill}%

                            </span>

                            <div className="progress">

                                <div

                                    className="progress-fill"

                                    style={{
                                        width: `${ward.fill}%`
                                    }}

                                ></div>

                            </div>

                            <p>{ward.waste}</p>

                        </div>

                    ))

                }

            </div>

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