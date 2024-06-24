import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TextField from "@mui/material/TextField"; // เพิ่มการ import TextField
import TableEnter from "./componentPage/recreationalTable";

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

  const handleSearch = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
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
        <div className="Side-bar">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        <div
          className="contrainer-main"
          style={{
            marginLeft: isSidebarOpen ? 100 : 70,
            marginRight: isSidebarOpen ? 70 : 70,
            transition: "margin 0.3s",
          }}
        >
          <h1>จัดการข้อมูลอุปกรณ์นันทนาการ</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginBottom: 16 }}>
            <TextField
              label="ค้นหาด้วย ID"
              variant="outlined"
              size="small"
              value={searchTerms.id}
              onChange={(e) => handleSearch("id", e.target.value)}
            />
            <TextField
              label="ค้นหาด้วยชื่ออุปกรณ์"
              variant="outlined"
              size="small"
              value={searchTerms.equipment_name}
              onChange={(e) => handleSearch("equipment_name", e.target.value)}
            />
            <TextField
              label="ค้นหาด้วยวันที่นำเข้า"
              variant="outlined"
              size="small"
              value={searchTerms.import_date}
              onChange={(e) => handleSearch("import_date", e.target.value)}
            />
            <TextField
              label="ค้นหาด้วยวันที่อัพเดทล่าสุด"
              variant="outlined"
              size="small"
              value={searchTerms.last_update}
              onChange={(e) => handleSearch("last_update", e.target.value)}
            />
          </div>
          <br />
          <TableEnter isOpen={isSidebarOpen} searchTerms={searchTerms} />
        </div>
      </div>
    </div>
  );
}

export default Manage;
