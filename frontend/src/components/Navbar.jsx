import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-left">
        <div className="logo">
          🏙
        </div>

        <div>
          <h2>Smart Urban Resource Allocation</h2>
          <p>AI Powered Smart City Dashboard</p>
        </div>
      </div>

      <div className="navbar-right">

        <div className="status">
          <span className="status-dot"></span>
          System Online
        </div>

        <div className="profile">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
            alt="Admin"
          />

          <div>
            <h4>City Admin</h4>
            <p>Municipal Dashboard</p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;