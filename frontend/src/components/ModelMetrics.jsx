import "./ModelMetrics.css";

function ModelMetrics() {

    const metrics = [

        {
            title: "Accuracy",
            value: "94.2%",
            color: "#2563eb"
        },

        {
            title: "Precision",
            value: "92.5%",
            color: "#16a34a"
        },

        {
            title: "Recall",
            value: "91.8%",
            color: "#f59e0b"
        },

        {
            title: "F1 Score",
            value: "92.1%",
            color: "#ef4444"
        }

    ];

    return (

        <div className="metrics-card">

            <h2>🤖 AI Model Performance</h2>

            <p>
                Performance evaluation of the trained Random Forest model.
            </p>

            <div className="metrics-grid">

                {

                    metrics.map((item,index)=>(

                        <div
                            key={index}
                            className="metric-box"
                        >

                            <h4>

                                {item.title}

                            </h4>

                            <h1
                                style={{
                                    color:item.color
                                }}
                            >

                                {item.value}

                            </h1>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ModelMetrics;