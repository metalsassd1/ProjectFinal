// Sidebar.js
import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const drawerWidth = 200;

const Sidebar = ({ onItemClick }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <List>
        <ListItem button onClick={() => onItemClick("Home")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => onItemClick("Dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => onItemClick("Settings")}>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
