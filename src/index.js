import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Manage from "./pages/Manage/Manage.js";
// import Navbar from "./components/navbar.js";
import EquipmentMan from "./pages/EquipmentMan/Sport.js"
import EntertainmentMan from "./pages/EntertainmentMan/Entertainment.js"
import UserMan from "./pages/UserMan/User.js"
import Report from "./pages/report/Report.js"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Manage />} />
        <Route path="/2" element={<EquipmentMan/>}/>
        <Route path="/3" element={<EntertainmentMan/>}/>
        <Route path="/4" element={<UserMan/>}/>
        <Route path="/5" element={<Report/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
