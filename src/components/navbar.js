import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#333399", // Change the background color to #333399
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  height: 40,
  padding: "10px",
  marginBottom: "10px",
  marginTop: "-8px",
});

const Navbar = ({ isOpen, onLogout, onToggleSidebar }) => {
  return (
    <CustomAppBar position="sticky" elevation={1}>
      <Toolbar>
        <IconButton sx={{ zIndex: 999, ml: 2, mt: -3 }}>
          <MenuIcon style={{ color: "white",padding: "10px",
  marginBottom: "10px",
  marginTop: "-8px", }} onClick={onToggleSidebar} />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
