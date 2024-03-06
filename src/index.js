import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Manage from "./pages/LoanDetails/Manage.js";
// import Navbar from "./components/navbar.js";
import EquipmentMan from "./pages/EquitmentSport/Sport.js";
import EntertainmentMan from "./pages/EquitmentRecreational/recreational.js";
import UserMan from "./pages/UserMan/User.js";
import Report from "./pages/report/Report.js";
import AddpageEn from "./pages/EquitmentRecreational/supPage/addPage.js";
import AddpageEq from "./pages/EquitmentSport/supPage/addPage.js";
import AddpageUs from "./pages/UserMan/supPage/addPage.js";
import Emailsener from "./pages/EmailJs/rotueTheme.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Manage />} />
        <Route path="/2" element={<EquipmentMan />} />
        <Route path="/2/add" element={<AddpageEq />} />
        <Route path="/3" element={<EntertainmentMan />} />
        <Route path="/3/add" element={<AddpageEn />} />
        <Route path="/4" element={<UserMan />} />
        <Route path="/4/add" element={<AddpageUs />} />
        <Route path="/5" element={<Report />} />
        <Route path="/Sender" element={<Emailsener />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
