// src/components/DepartmentLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DepartmentLogin.css';

const DepartmentLogin = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '', type: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const departmentEmails = {
    HR: 'hr@f2fintech.com',
    IT: 'it@f2fintech.com',
    ADMIN: 'hr@f2fintech.com',
    OPS: 'ops@f2fintech.com',
    MARKETING: 'marketing@f2fintech.com',
    CREDIT: 'credit@f2fintech.com',
    ACCOUNTANDFINANCE: 'accountfinance@f2fintech.com',
    DIRECTORS: 'wecare@f2fintech.com',
    GROWTH: 'growth@f2fintech.com',
    OTHER: 'other@f2fintech.com'
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); // Reset error message when user changes input
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, type } = formData;

    if (email !== departmentEmails[type]) {
      setErrorMsg('Oops!!! Email or password does not match the selected department type😞');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }

    try {
      const res = await axios.post('http://13.235.164.94:5000/api/department/login', { email, password, type });
      console.log(res.data.msg); // Log the success message

      // Update authentication state and redirect based on department type
      setIsAuthenticated(true);
      if (type === 'HR') {
        navigate('/api/hrrecord');
      } else if (type === 'IT') {
        navigate('/api/formData');
      } else if (type === 'Admin') {
        navigate('/api/adminrecord');
      } else if (type === 'OTHER') {
        navigate('/api/ceostatus');
      } else if (type === 'OPS') {
        navigate('/api/opsrecord');
      } else if (type === 'MARKETING') {
        navigate('/api/markrecord');
      } else if (type === 'CREDIT') {
        navigate('/api/creditrecord');
      } else if (type === 'ACCOUNTANDFINANCE') {
        navigate('/api/accfinrecord');
      } else if (type === 'DIRECTORS') {
        navigate('/api/directorrecord');
      } else if (type === 'GROWTH') {
        navigate('/api/growthrecord');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrorMsg('Your email or password or both are incorrect. Please check it.');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  return (
    <form className="form-container-login" onSubmit={onSubmit}>
      <h1>Login</h1>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Department Type:</label>
        <select id="type" name="type" value={formData.type} onChange={onChange} required>
          <option value="">Select Department</option>
          <option value="DIRECTORS">DIRECTORS</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="OPS">OPS</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MARKETING">MARKETING</option>
          <option value="CREDIT">CREDIT</option>
          <option value="GROWTH">GROWTH</option>
          <option value="ACCOUNTANDFINANCE">ACCOUNTANDFINANCE</option>
          <option value="OTHER">OTHER</option>
        </select>
      </div>
      <button className='dept-loginbtn' type="submit">LOGIN</button>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </form>
  );
};

export default DepartmentLogin;
