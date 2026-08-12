import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const menuItems = [
        { icon: "🏠", title: "Dashboard", path: "/" },
        { icon: "🤖", title: "AI Prediction", path: "/prediction" },
        { icon: "📊", title: "Analytics", path: "/analytics" },
        { icon: "🚛", title: "Resource Allocation", path: "/resource-allocation" },
        { icon: "💰", title: "Economic Analysis", path: "/economics" },
        { icon: "🗺️", title: "Ward Monitoring", path: "/ward-monitoring" },
        { icon: "📄", title: "Reports", path: "/reports" },
        { icon: "⚙️", title: "Settings", path: "/settings" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            {/* Nav Menu */}
            <div className="menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"
                        }
                    >
                        <span className="menu-icon">{item.icon}</span>
                        <span>{item.title}</span>
                    </NavLink>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="sidebar-bottom">
                <button
                    className="sidebar-action-btn"
                    onClick={toggleTheme}
                    title="Toggle dark/light mode"
                >
                    <span>{theme === "dark" ? "☀️" : "🌙"}</span>
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>

                <button
                    className="sidebar-action-btn logout-btn"
                    onClick={handleLogout}
                    title="Logout"
                >
                    <span>🚪</span>
                    <span>Logout</span>
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;