import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import WasteChart from "../components/WasteChart";
import OverflowPieChart from "../components/OverflowPieChart";
import WardTable from "../components/WardTable";
import PredictionForm from "../components/PredictionForm";
function Dashboard() {
  return (
    <div>

      <Navbar/>

      <div
      style={{
        display:"flex"
      }}
      >

        <Sidebar/>

        <div
        style={{
          flex:1,
          padding:"30px",
          background:"#f4f6f9",
          minHeight:"100vh"
        }}
        >

          <DashboardCards/>
          <WasteChart/>
          <OverflowPieChart/>
          <WardTable/>
          <PredictionForm/>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;