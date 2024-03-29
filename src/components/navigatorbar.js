// Sidebar.js
import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
    onClose();
  };
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      BackdropProps={{ invisible: true }}
      sx={{ "& .MuiDrawer-paper": { width: 240 } }}
    >
      <List style={{ background: "#EBECEB" }}>
        <ListItem
          style={{
            borderBottom: "1px #ccc",
            background: "#1CA82A",
            width: "200%",
            fontSize: "large",
            padding: "10px",
            marginBottom: "10px",
            marginTop: "-8px",
          }}
        >
          PIM CAN TAKE
        </ListItem>

        <ListItem button onClick={() => handleRedirect("/")}>
          <ListItemText primary="หน้าหลัก" />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/2")}>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์กีฬา" />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/3")}>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์นันทนาการ" />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/1")}>
          <ListItemText primary="จัดการข้อมูลการยืม" />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/4")}>
          <ListItemText primary="จัดการผู้ใช้" />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/5")}>
          <ListItemText primary="รายงายสรุปผล" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
