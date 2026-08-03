function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "calc(100vh - 70px)",
        background: "#1e293b",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <p>📊 Dashboard</p>

      <p>🤖 Prediction</p>

      <p>📈 Analytics</p>

      <p>⚙ Settings</p>
    </div>
  );
}

export default Sidebar;