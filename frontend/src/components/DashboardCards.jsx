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
      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return (
      <div className="cards-loading">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Bins",
      value: dashboardData.total_bins,
      icon: "🗑️",
      color: "#2563eb",
      trend: "+8%",
      subtitle: "Installed Bins",
    },
    {
      title: "Overflow Bins",
      value: dashboardData.overflow_bins,
      icon: "🚨",
      color: "#ef4444",
      trend: "-12%",
      subtitle: "Require Attention",
    },
    {
      title: "Fuel Saved",
      value: `${dashboardData.fuel_saved} L`,
      icon: "⛽",
      color: "#16a34a",
      trend: "+18%",
      subtitle: "Optimized Routes",
    },
    {
      title: "Money Saved",
      value: `₹${dashboardData.money_saved}`,
      icon: "💰",
      color: "#f59e0b",
      trend: "+25%",
      subtitle: "Operational Savings",
    },
  ];

  return (
    <section className="cards-grid">
      {cards.map((card, index) => (
        <div
          key={index}
          className="dashboard-card"
          style={{
            "--accent": card.color,
          }}
        >
          <div className="card-top">
            <div>
              <span className="card-title">{card.title}</span>

              <h2>{card.value}</h2>

              <small>{card.subtitle}</small>
            </div>

            <div
              className="card-icon"
              style={{
                background: card.color,
              }}
            >
              {card.icon}
            </div>
          </div>

          <div className="card-bottom">
            <span className="trend">{card.trend}</span>

            <span className="vs-text">vs last week</span>
          </div>
        </div>
      ))}
    </section>
  );
}

export default DashboardCards;