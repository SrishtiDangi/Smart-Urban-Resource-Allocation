import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">

            <div className="navbar-left">

                <div className="logo-box">
                    🏙️
                </div>

                <div className="title-section">
                    <h2>Smart Urban Resource Allocation Platform</h2>
                    <p>AI Powered Smart City Management Dashboard</p>
                </div>

            </div>

            <div className="navbar-right">

                <div className="system-status">

                    <span className="status-dot"></span>

                    <span>System Online</span>

                </div>

                <div className="profile">

                    <div className="avatar">
                        CD
                    </div>

                    <div className="profile-info">
                        <h4>City Administrator</h4>
                        <p>Municipal Dashboard</p>
                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;