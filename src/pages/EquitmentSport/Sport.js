import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/navigatorbar";
import SearchBar from "../../components/SeachBar";
import TableEquip from "./componentPage/tableSport";
import { TextField, Box } from "@mui/material"; // เพิ่ม Box ตรงนี้
import { useRecoilState } from "recoil";
import {
  isSidebarOpenState,
} from "../../Recoils/AdminRecoil/AdminHomeRecoil";
 
function Manage() {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <h1>จัดการข้อมูลอุปกรณ์กีฬา</h1>
          <Box display="flex" flexWrap="wrap" gap={2} mb={2}></Box>
          <TableEquip isOpen={isSidebarOpen} />
        </div>
      </div>
    </div>
  );
}

export default Manage;
