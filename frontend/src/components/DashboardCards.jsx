import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
import "./DashboardCards.css";

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

    return <h2>Loading Dashboard...</h2>;

  }

  const cards = [

    {
      title: "Total Bins",
      value: dashboardData.total_bins,
      icon: "🗑️",
      color: "#2563eb",
      trend: "+8%"
    },

    {
      title: "Overflow Bins",
      value: dashboardData.overflow_bins,
      icon: "🚨",
      color: "#ef4444",
      trend: "-12%"
    },

    {
      title: "Fuel Saved",
      value: dashboardData.fuel_saved + " L",
      icon: "⛽",
      color: "#22c55e",
      trend: "+18%"
    },

    {
      title: "Money Saved",
      value: "₹" + dashboardData.money_saved,
      icon: "💰",
      color: "#f59e0b",
      trend: "+25%"
    }

  ];

  return (

    <div className="cards-grid">

      {

        cards.map((card,index)=>(

          <div
            key={index}
            className="dashboard-card"
            style={{
              borderTop:`5px solid ${card.color}`
            }}
          >

            <div className="card-top">

              <div>

                <h4>{card.title}</h4>

                <h2>{card.value}</h2>

              </div>

              <div
                className="card-icon"
                style={{
                  background:card.color
                }}
              >

                {card.icon}

              </div>

            </div>

            <div className="card-bottom">

              <span className="trend">

                {card.trend}

              </span>

              <small>vs last week</small>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default DashboardCards;