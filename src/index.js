// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home/Home.js";
import Navbar from "./components/navbar.js";

ReactDOM.render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);
