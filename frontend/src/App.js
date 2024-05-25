import React from 'react';
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/login" element={<DepartmentLogin />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/api/formData" element={<FetchRecord />} />
          <Route path="/api/userstatus" element={<UserStatus />} />
          <Route path="/api/hrrecord" element={<HrFetchRecords />} />
          <Route path="/api/adminrecord" element={<AdminFetchRecords />} />
          <Route path="/api/ceostatus" element={<CeoFetchRecord />} />
          <Route path="/api/opsrecord" element={<OpsRecord />} />
          <Route path="/api/markrecord" element={<MarketingRecord />} />
          <Route path="/api/creditrecord" element={<CreditRecord />} />
          <Route path="/api/accfinrecord" element={<AccAndFinRecord />} />
          <Route path="/api/directorrecord" element={<DirectorRecord />} />
          <Route path="/api/growthrecord" element={<GrowthRecord />} />
          <Route path="/home" element={<IndexPage />} />
          <Route path="/docs-sharing" element={<FormWrapper />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
