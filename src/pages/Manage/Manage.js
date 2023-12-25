import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import SearchBar from "../../components/SeachBar";
import TableManage from "./componentPage/tableManage";

function Manage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (searchTerm) => {
    // Handle the search term, e.g., filter data based on the search term
    console.log("Search term in Manage component:", searchTerm);
  };

  return (
    <div className="m" style={{ background: "#f0f0f0" }}>
      <div
        className="HEAD"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <div className="Navbar">
          <Navbar onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="Side-bar">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
        <div
          className="contrainer-main"
          style={{
            marginLeft: isSidebarOpen ? 100 : 70,
            marginRight: isSidebarOpen ? 70 : 70,
            transition: "margin 0.3s",
          }}
        >
          <h1>จัดการข้อมูลการยืม</h1>
          {/* Use the SearchBar component */}
          <SearchBar onSearch={handleSearch} />
          <br/>
          <TableManage/>
        </div>
      </div>
    </div>
  );
}

export default Manage;
