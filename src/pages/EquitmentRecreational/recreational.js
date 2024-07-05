import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableEnter from "./componentPage/recreationalTable";

function Manage(searchTerms ) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <div className="Navbar">
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="Side-bar">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
      
          <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
          <h1>จัดการข้อมูลอุปกรณ์นันทนาการ</h1>
          <br />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 16 }}>
          
          </div>
          <TableEnter isOpen={isSidebarOpen} searchTerms={searchTerms} />
        </div>
      </div>
    </div>
    
  );
}

export default Manage;
