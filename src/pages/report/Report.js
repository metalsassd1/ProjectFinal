import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableReport from "./componentPage/tableReport";
import Barchart from "./componentPage/barChart";
import Piechart from "./componentPage/pieChart";
import * as XLSX from 'xlsx';

function ReportPage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const exportToExcel=(data,sheetName,fileName)=>{
    //workbook
    const workbook = XLSX.utils.book_new();

    //converworksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    //add workbook
    XLSX.utils.book_append_sheet(workbook,worksheet,sheetName);
    
    XLSX.writeFile(workbook,`${fileName}.xlsx`);
  };


  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // this applies the space-between layout
    alignItems: 'center', // this centers the charts vertically
    padding: '20px', // add padding as necessary
    margin: '20px 0', // add margin as necessary
  };

  return (
    <div className="m" style={{ background: "#e0e6fc" }}>
      <div
        className="header"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
      </div>
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
          <TableReport 
          exportToExcel={exportToExcel}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
