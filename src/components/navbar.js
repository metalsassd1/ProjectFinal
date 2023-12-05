// Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const WhiteAppBar = styled(AppBar)({
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adjust the shadow as needed
  height: 40, // Adjust the height as needed
});

const Navbar = ({ isOpen, onLogout, onToggleSidebar }) => {
  return (
    <WhiteAppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton sx={{ zIndex: 999, ml: 2, mt: -3 }}>
          <MenuIcon onClick={onToggleSidebar} />
        </IconButton>
      </Toolbar>
    </WhiteAppBar>
  );
};

export default Navbar;
