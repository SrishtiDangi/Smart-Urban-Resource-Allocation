import "./Navbar.css";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <header className="navbar">

            {/* LEFT */}
            <div className="navbar-left">

                <div className="logo-box">
                    🏙️
                </div>

                <div className="title-section">
                    <h2>
                        Smart Urban Resource Allocation Platform
                    </h2>

                    <p>
                        AI Powered Smart City Management Dashboard
                    </p>
                </div>

            </div>


            {/* RIGHT */}
            <div className="navbar-right">

                {/* DARK MODE */}
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    title={
                        theme === "dark"
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>


                {/* SYSTEM STATUS */}
                <div className="system-status">
                    <span className="status-dot"></span>
                    <span>System Online</span>
                </div>


                {/* ADMIN PROFILE */}
                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <button
                        className="profile"
                        onClick={() => setProfileOpen(!profileOpen)}
                    >

                        <div className="avatar">
                            AD
                        </div>

                        <div className="profile-info">
                            <h4>Admin</h4>
                            <p>City Administrator</p>
                        </div>

                        <span
                            className={`profile-arrow ${profileOpen ? "open" : ""
                                }`}
                        >
                            ▾
                        </span>

                    </button>


                    {/* DROPDOWN */}
                    {profileOpen && (
                        <div className="profile-dropdown">

                            <button
                                onClick={() => {
                                    navigate("/settings");
                                    setProfileOpen(false);
                                }}
                            >
                                👤
                                <span>Profile</span>
                            </button>

                            <button
                                className="dropdown-logout"
                                onClick={handleLogout}
                            >
                                🚪
                                <span>Logout</span>
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;