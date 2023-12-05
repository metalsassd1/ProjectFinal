// Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ onLogout }) => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, #4CAF50, transparent)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
          PIM CAN TAKE
        </Typography>
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
