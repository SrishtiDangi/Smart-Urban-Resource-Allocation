import { useState } from "react";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Reports.css";

function Reports() {
    const [downloading, setDownloading] = useState(null);

    // ─── PDF Generator ───────────────────────────────────────
    const downloadPDF = (title, rows) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 0, 210, 28, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Smart Urban Resource Allocation", 14, 12);
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(title, 14, 22);

        // Date
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

        // Content rows
        doc.setTextColor(30, 41, 59);
        let y = 48;
        rows.forEach(([label, value]) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text(label + ":", 14, y);
            doc.setFont("helvetica", "normal");
            doc.text(String(value), 80, y);
            y += 10;
        });

        doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
    };

    // ─── CSV Generator ───────────────────────────────────────
    const downloadCSV = (filename, headers, rows) => {
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ─── Report Actions ──────────────────────────────────────
    const handleDownload = async (type) => {
        setDownloading(type);
        await new Promise(r => setTimeout(r, 800)); // Simulate processing

        try {
            if (type === "daily") {
                downloadPDF("Daily Waste Report", [
                    ["Total Bins", "150"],
                    ["Overflow Bins", "26"],
                    ["Normal Bins", "124"],
                    ["Collection Rate", "82.7%"],
                    ["Ward 1 Waste", "420 kg"],
                    ["Ward 2 Waste", "210 kg"],
                    ["Ward 3 Waste", "390 kg"],
                    ["Ward 4 Waste", "180 kg"],
                    ["Total Waste Today", "1,200 kg"],
                ]);
                toast.success("📄 Daily Waste Report downloaded!");
            }

            if (type === "prediction") {
                downloadCSV("AI_Prediction_Report.csv",
                    ["Ward", "Overflow Predicted", "Confidence", "Priority", "Recommended Action"],
                    [
                        ["Ward-1", "Yes", "87%", "High", "Immediate Collection"],
                        ["Ward-2", "No",  "91%", "Low",  "Schedule Normal"],
                        ["Ward-3", "Yes", "78%", "High", "Immediate Collection"],
                        ["Ward-4", "No",  "84%", "Low",  "Schedule Normal"],
                    ]
                );
                toast.success("📊 AI Prediction Report exported as CSV!");
            }

            if (type === "economics") {
                downloadPDF("Economic Impact Report", [
                    ["Fuel Saved (Today)", "32 Liters"],
                    ["Money Saved (Today)", "₹4,750"],
                    ["CO2 Reduced", "74 kg"],
                    ["Operational Cost Reduction", "18%"],
                    ["Trucks Optimized", "8"],
                    ["Routes Optimized", "12"],
                    ["Annual Projected Savings", "₹17,33,750"],
                ]);
                toast.success("💰 Economic Report downloaded!");
            }

            if (type === "ward") {
                downloadCSV("Ward_Performance_Report.csv",
                    ["Ward", "Population", "Waste (kg)", "Overflow", "Collection Efficiency"],
                    [
                        ["Ward-1", "8500", "420", "Yes", "76%"],
                        ["Ward-2", "5300", "210", "No",  "94%"],
                        ["Ward-3", "7200", "390", "Yes", "79%"],
                        ["Ward-4", "4100", "180", "No",  "97%"],
                    ]
                );
                toast.success("🗺️ Ward Performance Report exported as CSV!");
            }
        } catch {
            toast.error("❌ Download failed. Please try again.");
        }

        setDownloading(null);
    };

    // ─── Report Cards ────────────────────────────────────────
    const reports = [
        {
            id: "daily",
            title: "Daily Waste Report",
            description: "Summary of waste collected across all wards today.",
            icon: "🗑️",
            btnLabel: "Download PDF",
            btnClass: "btn-pdf",
        },
        {
            id: "prediction",
            title: "AI Prediction Report",
            description: "Overflow predictions generated by the ML model.",
            icon: "🤖",
            btnLabel: "Export CSV",
            btnClass: "btn-csv",
        },
        {
            id: "economics",
            title: "Economic Impact Report",
            description: "Fuel savings, cost reduction and CO₂ analysis.",
            icon: "💰",
            btnLabel: "Download PDF",
            btnClass: "btn-pdf",
        },
        {
            id: "ward",
            title: "Ward Performance Report",
            description: "Ward-wise efficiency and collection statistics.",
            icon: "📊",
            btnLabel: "Export CSV",
            btnClass: "btn-csv",
        },
    ];

    return (
        <div className="reports-page">
            <Navbar />
            <div className="dashboard-body">
                <Sidebar />
                <main className="reports-content">

                    <div className="page-header">
                        <h1>📄 Reports Center</h1>
                        <p>Generate, export and monitor all smart city reports from one place.</p>
                    </div>

                    <div className="reports-grid">
                        {reports.map((report) => (
                            <div key={report.id} className="report-card">
                                <div className="report-icon">{report.icon}</div>
                                <h3>{report.title}</h3>
                                <p>{report.description}</p>
                                <button
                                    className={`report-btn ${report.btnClass}`}
                                    onClick={() => handleDownload(report.id)}
                                    disabled={downloading === report.id}
                                >
                                    {downloading === report.id ? (
                                        <span className="btn-loading">
                                            <span className="spinner-sm"></span> Generating...
                                        </span>
                                    ) : (
                                        report.btnLabel
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Reports;