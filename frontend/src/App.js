import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchRecord from './components/FetchRecord';
import UserForm from './components/UserForm';
import UserStatus from './components/UserStatus';
import Navbar from './components/Navbar'; // Import the Navbar component
import HrFetchRecords from './components/HrFetchRecords';
import AdminFetchRecords from './components/AdminFetchRecords';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add the Navbar component */}
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/api/formData" element={<FetchRecord />} />
          <Route path="/userstatus" element={<UserStatus />} />
          <Route path="/api/hrrecord" element={<HrFetchRecords/>}/>
          <Route path="/api/adminrecord" element={<AdminFetchRecords/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
