import React, { useState, useEffect } from "react";
import Sidebar from "../../components/navigatorbar";
import Navbar from "../../components/navbar";
import MyTable from "./componentPage/tableHome";
import RectangleBox from "./componentPage/chart/UserCount";
import RectangleBox1 from "./componentPage/chart/returnedCount";
import RectangleBox2 from "./componentPage/chart/totalLend";
import RectangleBox3 from "./componentPage/chart/equipmentCount";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import "./Monitoring.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    equipment_name: "",
    equipment_type: "",
    borrower_name: "",
    borrow_date: "", // เพิ่ม borrow_date ใน state สำหรับการกรองตามวันที่ยืม
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ส่งคำขอเพื่อเรียกดูข้อมูลหากจำเป็น
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ background: "#e0e6fc", fontFamily: "'Arial', sans-serif" }}>
      <div
        className="header"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className={isSidebarOpen ? "sidebar-open" : "sidebar-closed"}>
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
        <h1>หน้าหลัก</h1>
        <div className="grid-container">
          <div className="box1">
            <RectangleBox3 />
          </div>
          <div className="box1">
            <RectangleBox />
          </div>
          <div className="box1">
            <RectangleBox2 />
          </div>
          <div className="box1">
            <RectangleBox1 />
          </div>
        </div>
        <br />
        <Box component="form" className="search-container" noValidate autoComplete="off">
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

        </Box>
        <div className="tableHome">
          <MyTable searchTerms={searchTerms} />
        </div>
      </div>
    </div>
  );
};

export default App;
