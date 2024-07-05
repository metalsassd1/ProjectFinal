import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TextField from "@mui/material/TextField";
import TableManage from "./componentPage/tableManage";
import { Grid } from "@mui/material";

function Manage(searchTerms) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <div className="m" style={{ background: "#e0e6fc" }}>
      <div className="header" style={{ marginLeft: isSidebarOpen ? 200 : 0, transition: "margin 0.3s" }}>
      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        <div className="Navbar">
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </div>
      </div>
      <div className="Side-bar">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="contrainer-main" style={{ marginLeft: isSidebarOpen ? 300 : 100, marginRight: isSidebarOpen ? 70 : 100, transition: "margin 0.3s" }}>
        <h1>จัดการข้อมูลการยืม</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          
        </div>
        
        <TableManage isOpen={isSidebarOpen} searchTerms={searchTerms} />
      </div>
      </div>
    </div>
  );
}

export default Manage;
