import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
function DashboardCards() {
    const [dashboardData, setDashboardData] = useState(null);
    useEffect(() => {

        async function fetchDashboard() {

            try {

                const response = await getDashboardData();

                setDashboardData(response.data);

            }

            catch (error) {

                console.log(error);

            }

        }

        fetchDashboard();

    }, []);
    if (!dashboardData) {

        return <h2>Loading...</h2>;

    }

    const cards = [

        {

            title: "Total Bins",

            value: dashboardData.total_bins

        },

        {

            title: "Overflow Bins",

            value: dashboardData.overflow_bins

        },

        {

            title: "Fuel Saved",

            value: dashboardData.fuel_saved + " L"

        },

        {

            title: "Money Saved",

            value: "₹" + dashboardData.money_saved

        }

    ];

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginBottom: "30px"
            }}
        >

            {
                cards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            background: "#fff",
                            padding: "25px",
                            borderRadius: "12px",
                            boxShadow: "0 0 10px rgba(0,0,0,.15)"
                        }}
                    >
                        <h3>{card.title}</h3>

                        <h1>{card.value}</h1>

                    </div>
                ))
            }

        </div>

    )

}

export default DashboardCards;