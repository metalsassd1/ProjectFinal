import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import SearchBar from "../../components/SeachBar";
import TableEquip from "./componentPage/tableSport";
import { TextField, Box } from "@mui/material";  // เพิ่ม Box ตรงนี้


function Manage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    equipment_name: "",
    import_date: "",
    last_update: ""
  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (term) => {
    setSearchTerms(term);  // Update the search term state
    console.log("Search term in Manage component:", term);
  };

  return (
    <div className="m" style={{ background: "#f0f0f0" }}>
      <div
        className=""
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
        <h1>จัดการข้อมูลอุปกรณ์กีฬา</h1>
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        
        </Box>
      <TableEquip searchTerms={searchTerms} isOpen={isSidebarOpen} />
    </div>
  </div>
);
}

export default Manage;

