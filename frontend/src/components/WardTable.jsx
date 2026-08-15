import { useEffect, useState } from "react";
import { getWardData } from "../services/api";
import "./WardTable.css";

function WardTable() {

  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchWards() {

      try {

        const response = await getWardData();

        setWards(response.data);

      } catch (err) {

        console.error("Failed to fetch ward data:", err);

        setError("Unable to load ward data.");

      } finally {

        setLoading(false);

      }

    }

    fetchWards();

  }, []);

  if (loading) {

    return (
      <div className="table-card">
        <div className="table-loading">
          Loading Ward Data...
        </div>
      </div>
    );

  }

  if (error) {

    return (
      <div className="table-card">
        <div className="table-error">
          ⚠️ {error}
        </div>
      </div>
    );

  }

  return (

    <div className="table-card">

      {/* HEADER */}

      <div className="table-header">

        <div>

          <h2>📍 Ward Monitoring Dashboard</h2>

          <p>
            Live monitoring of waste generation and
            overflow status.
          </p>

        </div>

        <button>
          📥 Export Report
        </button>

      </div>


      {/* TABLE */}

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

            {wards.map((item, index) => {

              /*
               * Backend currently sends:
               *
               * ward
               * population
               * waste
               * overflow
               *
               * Priority is calculated here temporarily.
               */

              const priority =
                item.overflow === "Yes"
                  ? "High"
                  : "Low";


              return (

                <tr key={item.id || index}>

                  {/* WARD */}

                  <td>
                    <strong>
                      {item.ward}
                    </strong>
                  </td>


                  {/* POPULATION */}

                  <td>
                    {Number(
                      item.population
                    ).toLocaleString()}
                  </td>


                  {/* WASTE */}

                  <td>
                    {item.waste}
                  </td>


                  {/* OVERFLOW */}

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


                  {/* PRIORITY */}

                  <td>

                    <span
                      className={
                        priority === "Critical"
                          ? "priority critical"
                          : priority === "High"
                            ? "priority high"
                            : "priority low"
                      }
                    >

                      {priority}

                    </span>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default WardTable;