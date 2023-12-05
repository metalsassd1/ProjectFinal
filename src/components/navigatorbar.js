// Sidebar.js
import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ isOpen, onClose }) => {
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

        <ListItem button>
          <ListItemText primary="หน้าหลัก" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์กีฬา" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="จัดการข้อมูลอุปกรณ์นันทนาการ" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="จัดการข้อมูลการยืม" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="จัดการผู้ใช้" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="รายงายสรุปผล" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
