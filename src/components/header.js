// src/components/Header.js
import React from "react";

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="left-section">
        <h1>PIM CAN Take</h1>
      </div>
      <div className="right-section">
        <p>{username}</p>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
