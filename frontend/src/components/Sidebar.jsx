import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { icon: "🏠", title: "Dashboard" },
    { icon: "🤖", title: "AI Prediction" },
    { icon: "📊", title: "Analytics" },
    { icon: "🚛", title: "Resource Allocation" },
    { icon: "💰", title: "Economic Analysis" },
    { icon: "🗺️", title: "Ward Monitoring" },
    { icon: "📈", title: "Reports" },
    { icon: "⚙️", title: "Settings" },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-box">🏙</div>

        <div>
          <h2>UrbanAI</h2>
          <p>Smart City System</p>
        </div>
      </div>

      <div className="menu">

        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${index === 0 ? "active" : ""}`}
          >
            <span className="menu-icon">{item.icon}</span>

            <span>{item.title}</span>
          </div>
        ))}

      </div>

      

    </aside>
  );
}

export default Sidebar;