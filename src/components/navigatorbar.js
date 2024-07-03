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
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          background: "#333399", // Set the background color for the drawer
        },
      }}
    >
      <List>
        <ListItem
          style={{
            borderBottom: "1px solid #ccc", // Change to solid border
            background: "#333399",
            color: "#fff", // Set text color to white
            fontSize: "large",
            padding: "10px",
            marginBottom: "10px",
            marginTop: "-8px",
          }}
        >
          PIM CAN TAKE
        </ListItem>

        <ListItem button onClick={() => handleRedirect("/")}>
          <ListItemText primary="หน้าหลัก" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/2")}>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์กีฬา" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/3")}>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์นันทนาการ" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/4")}>
          <ListItemText primary="จัดการข้อมูลผู้ใช้" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/1")}>
          <ListItemText primary="จัดการข้อมูลการยืม" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
        <ListItem button onClick={() => handleRedirect("/5")}>
          <ListItemText primary="รายงายสรุปผล" primaryTypographyProps={{ style: { color: "#fff" } }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;