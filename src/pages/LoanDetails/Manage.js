import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import SearchBar from "../../components/SeachBar";
import TableManage from "./componentPage/tableManage";
import axios from "axios";

function Manage(params) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const searchTerm = "บอล";
      const encodedTerm = encodeURIComponent(searchTerm);
      const searchUrl = `http://localhost:4000/api/search?term=${encodedTerm}`;
      const response = await axios.get(searchUrl);
      setResults(response.data); // Assuming the API returns the search results in the response body
    } catch (error) {
      console.error("Error during search:", error);
      // Handle the error state appropriately
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <h1>จัดการข้อมูลการยืม</h1>
        {/* Use the SearchBar component */}
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
        <br />
        <TableManage isOpen={isSidebarOpen} data={results} />
      </div>
    </div>
  );
}

export default Manage;
