// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchRecord from './components/FetchRecord';
import UserForm from './components/UserForm';
import UserStatus from './components/UserStatus';
import HrFetchRecords from './components/HrFetchRecords';
import AdminFetchRecords from './components/AdminFetchRecords';
import DepartmentLogin from './components/DepartmentLogin';
import SignupPage from './components/SignupPage';
import CeoFetchRecord from './components/CeoFetchRecord';
import OpsRecord from './components/OpsRecord';
import MarketingRecord from './components/MarketingRecord';
import CreditRecord from './components/CreditRecord';
import AccAndFinRecord from './components/AccAndFinRecord';
import DirectorRecord from './components/DirectorRecord';
import GrowthRecord from './components/GrowthRecord';
import IndexPage from './components/IndexPage';
import DataPage from './components/DataPage';
import ThankYouPage from './components/ThankYouPage';
import FormWrapper from './components/FormWrapper';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/login" element={<DepartmentLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<IndexPage />} />
          <Route path="/docs-sharing" element={<FormWrapper />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />

          <Route
            path="/api/formData"
            element={<ProtectedRoute element={FetchRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/userstatus"
            element={<ProtectedRoute element={UserStatus} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/hrrecord"
            element={<ProtectedRoute element={HrFetchRecords} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/adminrecord"
            element={<ProtectedRoute element={AdminFetchRecords} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/ceostatus"
            element={<ProtectedRoute element={CeoFetchRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/opsrecord"
            element={<ProtectedRoute element={OpsRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/markrecord"
            element={<ProtectedRoute element={MarketingRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/creditrecord"
            element={<ProtectedRoute element={CreditRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/accfinrecord"
            element={<ProtectedRoute element={AccAndFinRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/directorrecord"
            element={<ProtectedRoute element={DirectorRecord} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/api/growthrecord"
            element={<ProtectedRoute element={GrowthRecord} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
