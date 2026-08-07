import "./WardGrid.css";

function WardGrid({ selectedWard, setSelectedWard }) {

    const wards = [

        {
            id: 1,
            name: "Ward 1",
            population: 8500,
            waste: "420 kg",
            status: "Normal",
            priority: "Low",
        },

        {
            id: 2,
            name: "Ward 2",
            population: 7200,
            waste: "510 kg",
            status: "Overflow",
            priority: "High",
        },

        {
            id: 3,
            name: "Ward 3",
            population: 9100,
            waste: "610 kg",
            status: "Critical",
            priority: "Critical",
        },

        {
            id: 4,
            name: "Ward 4",
            population: 6000,
            waste: "280 kg",
            status: "Normal",
            priority: "Low",
        },

        {
            id: 5,
            name: "Ward 5",
            population: 7800,
            waste: "430 kg",
            status: "Overflow",
            priority: "High",
        },

        {
            id: 6,
            name: "Ward 6",
            population: 5400,
            waste: "210 kg",
            status: "Normal",
            priority: "Low",
        }

    ];

    return (

        <div className="ward-grid">

            {wards.map((ward) => (

                <div
                    key={ward.id}
                    className={`ward-box ${selectedWard?.id === ward.id ? "active" : ""
                        }`}
                    onClick={() => setSelectedWard(ward)}
                >

                    <div
                        className={`status-dot ${ward.status === "Critical"
                                ? "red"
                                : ward.status === "Overflow"
                                    ? "orange"
                                    : "green"
                            }`}
                    ></div>

                    <h3>{ward.name}</h3>

                    <p>{ward.population} People</p>

                    <small>{ward.waste}</small>

                </div>

            ))}

        </div>

    );

}

export default WardGrid;