import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import the CSS file

const SignupPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', type: '' });
  const [message, setMessage] = useState('');
  const [warnMsg, setWarnMsg] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Reset messages when user changes input
    setWarnMsg('');
  };

  const clearMessages = () => {
    setMessage('');
    setWarnMsg('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset messages
    setWarnMsg('');
    const validEmails = ['wecare@f2fintech.com', 'hr@f2fintech.com', 'it@f2fintech.com','other@f2fintech.com'];
    const { email } = formData;

    if (!validEmails.includes(email)) {
      setWarnMsg('Invalid email address😑. Please Signup with a valid email.');
      setTimeout(clearMessages, 4000);
    } else {
      try {
        const userExistsRes = await axios.get(`http://localhost:5000/api/department/email/${email}`);
        if (userExistsRes.data.exists) {
          setWarnMsg('Email already exists');
          setTimeout(clearMessages, 4000);
        } else {
          await axios.post('http://localhost:5000/api/department/signup', formData);
          setMessage('Signup successful😍');
          setTimeout(() => {
            clearMessages();
            navigate('/login');
          }, 4000);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setWarnMsg(error.response ? error.response.data.msg : 'Server error');
        setTimeout(clearMessages, 5000);
      }
    }
  };
  return (
    <form className="form-container-signup" onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="type">Department Type:</label>
        <select id="type" name="type" value={formData.type} onChange={onChange}>
        <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Admin">Admin</option>
          <option value="OTHER">OTHER</option>
        </select>
      </div>
      <button className='signup-btn' type="submit">REGISTER</button>
      {message && <p className="message">{message}</p>}
      {warnMsg && <p className="warnMessage">{warnMsg}</p>}
    </form>
    
  );
};

export default SignupPage;
