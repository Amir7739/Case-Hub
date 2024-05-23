import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchRecord from './components/FetchRecord';
import UserForm from './components/UserForm';
import UserStatus from './components/UserStatus';
import Navbar from './components/Navbar'; // Import the Navbar component
import HrFetchRecords from './components/HrFetchRecords';
import AdminFetchRecords from './components/AdminFetchRecords';
import DepartmentLogin from './components/DepartmentLogin';
import SignupPage from './components/SignupPage';
import CeoFetchRecord from './components/CeoFetchRecord';
import OpsRecord from './components/OpsRecord';
import MarketingRecord from './components/MarketingRecord';
import CreditRecord from './components/CreditRecord';
import AccAndFinRecord from './components/AccAndFinRecord';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add the Navbar component */}
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/login" element={<DepartmentLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/api/formData" element={<FetchRecord />} />
          <Route path="/api/userstatus" element={<UserStatus />} />
          <Route path="/api/hrrecord" element={<HrFetchRecords/>}/>
          <Route path="/api/adminrecord" element={<AdminFetchRecords/>}/>
          <Route path="/api/ceostatus" element={<CeoFetchRecord />} />
          <Route path="/api/opsrecord" element={<OpsRecord />} />
          <Route path="/api/markrecord" element={<MarketingRecord />} />
          <Route path="/api/creditrecord" element={<CreditRecord />} />
          <Route path="/api/accfinrecord" element={<AccAndFinRecord/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
