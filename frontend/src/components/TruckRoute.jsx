import "./TruckRoute.css";

function TruckRoute({ selectedWard }) {


    return (

        <div className="route-card">


            <h2>
                🚛 AI Optimized Collection Route
            </h2>


            <p>
                Predicted shortest route generated using AI
            </p>



            <div className="route-grid">


                <div className="depot">

                    🏭

                    <span>
                        Depot
                    </span>

                </div>



                <div className="road vertical"></div>



                <div className="truck">

                    🚛

                </div>



                <div className="road vertical"></div>



                <div 
                    className={
                        selectedWard.status === "Critical"
                        ? "ward critical"
                        : selectedWard.status === "Warning"
                        ? "ward warning"
                        : "ward normal"
                    }
                >

                    {selectedWard.name}

                </div>



            </div>




            <div className="route-info">


                <div>

                    ⏱ ETA

                    <strong>

                        {
                            selectedWard.status === "Critical"
                            ? "8 min"
                            : "15 min"
                        }

                    </strong>

                </div>



                <div>

                    ⛽ Fuel

                    <strong>
                        14 L
                    </strong>

                </div>



                <div>

                    💰 Savings

                    <strong>
                        ₹1850
                    </strong>

                </div>


            </div>



        </div>

    )

}


export default TruckRoute;