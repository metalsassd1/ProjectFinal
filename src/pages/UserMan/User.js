import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TableUser from "./componentPage/tableUserMan";

function Manage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    username: "",
    email: "",
    is_admin: "",
  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#e0e6fc",
      }}
    >
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div
          className="content-container"
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: isSidebarOpen ? "300px" : "100px",
            transition: "margin 0.3s",
          }}
        >
          <h1>จัดการข้อมูลผู้ใช้</h1>
          <TableUser isOpen={isSidebarOpen} searchTerms={searchTerms} />
        </div>
      </div>
    </div>
  );
}

export default Manage;
