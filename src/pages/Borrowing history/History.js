import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableManage from "./componentPage/TableHistory";

function History(searchTerms) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  return (
    <>
      <div className="header" style={{ marginLeft: isSidebarOpen ? 200 : 0, transition: "margin 0.3s" }}>
      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        </div>
      </div>
      <div className="Side-bar">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="contrainer-main" style={{ marginLeft: isSidebarOpen ? 300 : 100, marginRight: isSidebarOpen ? 70 : 100, transition: "margin 0.3s" }}>
        <h1>จัดการข้อมูลการยืม</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          
        
        <TableManage isOpen={isSidebarOpen} searchTerms={searchTerms} />
      </div>
      </div>
      </>
  );
}

export default History;
