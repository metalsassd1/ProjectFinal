// Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const WhiteAppBar = styled(AppBar)({
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  height: 40,
});

const Navbar = ({ isOpen, onLogout, onToggleSidebar }) => {
  return (
    <WhiteAppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton sx={{ zIndex: 999, ml: 2, mt: -3 }}>
          <MenuIcon onClick={onToggleSidebar} />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        
        
      </Toolbar>
    </WhiteAppBar>
  );
};

export default Navbar;
