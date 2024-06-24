import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import TextField from "@mui/material/TextField";
import TableManage from "./componentPage/tableManage";
import { Grid } from "@mui/material";

function Manage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    equipment_name: "",
    equipment_type: "",
    borrower_name: "",
    borrow_date: "", // เพิ่มตัวแปรสำหรับค้นหาด้วยวันที่ยืม
  });

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="m" style={{ background: "#f0f0f0" }}>
      <div className="header" style={{ marginLeft: isSidebarOpen ? 200 : 0, transition: "margin 0.3s" }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วย ID"
                variant="outlined"
                size="small"
                value={searchTerms.id}
                onChange={(e) => handleSearch("id", e.target.value)}
                InputLabelProps={{ shrink: true }}

            />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยชื่ออุปกรณ์"
                variant="outlined"
                size="small"
                value={searchTerms.equipment_name}
                onChange={(e) => handleSearch("equipment_name", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยประเภท"
                variant="outlined"
                size="small"
                value={searchTerms.equipment_type}
                onChange={(e) => handleSearch("equipment_type", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยชื่อผู้ยืม"
                variant="outlined"
                size="small"
                value={searchTerms.borrower_name}
                onChange={(e) => handleSearch("borrower_name", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยวันที่ยืม"
                variant="outlined"
                size="small"
                value={searchTerms.borrow_date}
                onChange={(e) => handleSearch("borrow_date", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </div>
        
        <TableManage isOpen={isSidebarOpen} searchTerms={searchTerms} />
      </div>
    </div>
  );
}

export default Manage;
