import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableReport from "./componentPage/tableReport";
import Barchart from "./componentPage/barChart";
import Piechart from "./componentPage/pieChart";

function ReportPage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // this applies the space-between layout
    alignItems: 'center', // this centers the charts vertically
    padding: '20px', // add padding as necessary
    margin: '20px 0', // add margin as necessary
  };

  return (
    <div className="m" style={{ background: "#f0f0f0" }}>
      <div
        className="header"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <div className="Navbar">
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </div>
      </div>
      <div className="Side-bar">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <div
        className="contrainer-main"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        <h1>รายงายสรุปผล</h1>
        <div className="chart-container" style={chartContainerStyle}>
          <Barchart />
          <Piechart />
        </div>
        <div className="tableHome">
          <TableReport />
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
