import "./WardTable.css";

function WardTable() {
  const wards = [
    {
      ward: "Ward-1",
      population: 8500,
      waste: "420 kg",
      overflow: "Yes",
      priority: "High",
    },
    {
      ward: "Ward-2",
      population: 5200,
      waste: "180 kg",
      overflow: "No",
      priority: "Low",
    },
    {
      ward: "Ward-3",
      population: 7300,
      waste: "390 kg",
      overflow: "Yes",
      priority: "High",
    },
    {
      ward: "Ward-4",
      population: 4100,
      waste: "150 kg",
      overflow: "No",
      priority: "Low",
    },
    {
      ward: "Ward-5",
      population: 9600,
      waste: "470 kg",
      overflow: "Yes",
      priority: "Critical",
    },
  ];

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h2>📍 Ward Monitoring Dashboard</h2>
          <p>Live monitoring of waste generation and overflow status.</p>
        </div>

        <button>📥 Export Report</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ward</th>
              <th>Population</th>
              <th>Waste Generated</th>
              <th>Overflow</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {wards.map((item, index) => (
              <tr key={index}>
                <td>{item.ward}</td>

                <td>{item.population.toLocaleString()}</td>

                <td>{item.waste}</td>

                <td>
                  <span
                    className={
                      item.overflow === "Yes"
                        ? "badge danger"
                        : "badge safe"
                    }
                  >
                    {item.overflow === "Yes"
                      ? "🔴 Overflow"
                      : "🟢 Normal"}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      item.priority === "Critical"
                        ? "priority critical"
                        : item.priority === "High"
                        ? "priority high"
                        : "priority low"
                    }
                  >
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WardTable;