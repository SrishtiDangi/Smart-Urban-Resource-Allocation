import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { icon: "🏠", title: "Dashboard", path: "/" },
        { icon: "🤖", title: "AI Prediction", path: "/prediction" },
        { icon: "📋", title: "History", path: "/history" },
        { icon: "📊", title: "Analytics", path: "/analytics" },
        { icon: "🚛", title: "Resource Allocation", path: "/resource-allocation" },
        { icon: "💰", title: "Economic Analysis", path: "/economics" },
        { icon: "🗺️", title: "Ward Monitoring", path: "/ward-monitoring" },
        { icon: "📄", title: "Reports", path: "/reports" },
        { icon: "⚙️", title: "Settings", path: "/settings" },
    ];

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            {/* Collapse Button */}
            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Toggle sidebar"
            >
                {collapsed ? "→" : "←"}
            </button>

            {/* Navigation */}
            <div className="sidebar-menu">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "menu-item active"
                                : "menu-item"
                        }
                    >
                        <span className="menu-icon">
                            {item.icon}
                        </span>

                        <span className="menu-text">
                            {item.title}
                        </span>
                    </NavLink>
                ))}

            </div>

        </aside>
    );
}

export default Sidebar;