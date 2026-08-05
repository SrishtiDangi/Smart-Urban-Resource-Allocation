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

      <div>

        <div className="sidebar-logo">


        </div>

        <nav className="menu">

          {
            menuItems.map((item, index) => (

              <div
                key={index}
                className={`menu-item ${index === 0 ? "active" : ""}`}
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span className="menu-title">
                  {item.title}
                </span>

              </div>

            ))
          }

        </nav>

      </div>

      <div className="sidebar-footer">

        <div className="server-status">

          <span className="green-dot"></span>

          AI Server Connected

        </div>

        <small>Version 1.0.0</small>

      </div>

    </aside>

  );

}

export default Sidebar;