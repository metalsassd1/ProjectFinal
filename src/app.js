import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Manage from "./pages/LoanDetails/Manage.js";
import EquipmentMan from "./pages/EquitmentSport/Sport.js";
import EntertainmentMan from "./pages/EquitmentRecreational/recreational.js";
import UserMan from "./pages/UserMan/User.js";
import Report from "./pages/report/Report.js";
import AddpageEq from "./pages/EquitmentSport/supPage/addPage.js";
import Emailsener from "./pages/EmailJs/rotueTheme.js";
import Borrower from "./pages/Borrower/index.js";
import MainPageUser from "./pages/MainPageUser/mainPage.js";
import ReturnTo from "./pages/ReturnTo/return.js";
import QRgen from "./pages/ReturnTo/QRcodeGen.js";
import Adminsubmit from "./pages/Borrower/components/adminEv.js";
import Submit from "./pages/Submit/Submit.js";
import SelectMethod from "./pages/SelectMethod/SelecetMethod.js"
import AdminUserLogin from "./pages/Submit/AdminUserLogin.js"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/borrower/:Ename/:Etype/:desired_quantity"
          element={<Borrower />}
        />
        <Route path="/SelectMethod" element={<SelectMethod />} />
        <Route path="/1" element={<Manage />} />
        <Route path="/2" element={<EquipmentMan />} />
        <Route path="/2/add" element={<AddpageEq />} />
        <Route path="/3" element={<EntertainmentMan />} />
        <Route path="/4" element={<UserMan />} />
        <Route path="/5" element={<Report />} />
        <Route path="/Sender" element={<Emailsener />} />
        <Route path="/MainPage" element={<MainPageUser />} />
        <Route path="/qr" element={<QRgen />} />
        <Route path="/return" element={<ReturnTo />} />
        <Route path="/success" element={<Adminsubmit/>}/>
        <Route path="/submit" element={<Submit />} />
        <Route path="/admin-login" element={<AdminUserLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
