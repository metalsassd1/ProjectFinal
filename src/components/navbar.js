import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";

const CustomAppBar = styled(AppBar)(({ open }) => ({
  backgroundColor: "#2c3e75", // Change the background color to #333399
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  height: 42,
  padding: "15px", // Increase the padding
  width: "100%", // Make the Navbar full width
  position: "fixed", // Fix the Navbar to the top of the page
  top: 0, // Ensure it is at the top
  left: 0, // Ensure it stretches from the left
  transform: open ? 'translateX(240px)' : 'translateX(0)', // Adjust this value based on the width of your sidebar
  transition: 'transform 0.3s ease',
  border : "1px solid black" // Smooth transition for the slide effect
}));

const Navbar = ({ isOpen, onLogout, onToggleSidebar }) => {
  return (
    <CustomAppBar position="sticky" elevation={1} open={isOpen}>
      <Toolbar>
        <IconButton sx={{ zIndex: 999, ml: 2, mt: -3 }}>
          <MenuIcon
            style={{
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "-20px", // Increase the size of the icon
            }}
            onClick={onToggleSidebar}
          />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
