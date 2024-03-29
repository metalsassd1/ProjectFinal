import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Manage from './pages/LoanDetails/Manage.js';
import EquipmentMan from './pages/EquitmentSport/Sport.js';
import EntertainmentMan from './pages/EquitmentRecreational/recreational.js';
import UserMan from './pages/UserMan/User.js';
import Report from './pages/report/Report.js';
import AddpageEq from './pages/EquitmentSport/supPage/addPage.js';
import Emailsener from './pages/EmailJs/rotueTheme.js';
import Borrower from './pages/Borrower/index.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrower" element={<Borrower />} />
        <Route path="/1" element={<Manage />} />
        <Route path="/2" element={<EquipmentMan />} />
        <Route path="/2/add" element={<AddpageEq />} />
        <Route path="/3" element={<EntertainmentMan />} />
        <Route path="/4" element={<UserMan />} />
        <Route path="/5" element={<Report />} />
        <Route path="/Sender" element={<Emailsener />} />
      </Routes>
    </Router>
  );
};

export default App;