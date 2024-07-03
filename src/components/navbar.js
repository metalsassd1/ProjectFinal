import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#333399", // Change the background color to #333399
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  height: 40,
});

const Navbar = ({ isOpen, onLogout, onToggleSidebar }) => {
  return (
    <CustomAppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton sx={{ zIndex: 999, ml: 2, mt: -3 }}>
          <MenuIcon style={{ color: 'white' }} onClick={onToggleSidebar} />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
