import React, { useState } from 'react';
import axios from 'axios';
import './userForm.css'; // Import CSS file

const UserForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        empId: '',
        empName: '',
        dateCreated: '',
        description: '',
        priority: '',
        status: '',
        category: '',
        assignedTo: '',
        comments: '',
        attachment: '',
        closureDetails: '',
        feedback: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString();
            const updatedFormData = {
                ...formData,
                dateCreated: currentDate
            };
            const response = await axios.post('http://13.235.164.94:5000/submitdata', updatedFormData);

            console.log(response.data);
            setSuccessMessage('Issue raised successfully!');
            setFormData({
                email: '',
                empId: '',
                empName: '',
                dateCreated: '',
                description: '',
                priority: '',
                status: '',
                category: '',
                assignedTo: '',
                comments: '',
                attachment: '',
                closureDetails: '',
                feedback: ''
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Case Issue Form</h1>
                <div className="form-group">
                    <label htmlFor="empId">EmpId:</label>
                    <input type="text" name="empId" id="empId" value={formData.empId} onChange={handleChange} placeholder="Please Enter Your employee id" />
                </div>
                <div className="form-group">
                    <label htmlFor="empName">Emp Name:</label>
                    <input type="text" name="empName" id="empName" value={formData.empName} onChange={handleChange} placeholder="Please Enter Your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Please Enter Your Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="assignedTo">Assigned To:</label>
                    <select name="assignedTo" id="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="closureDetails">Closure Details:</label>
                    <input type="text" name="closureDetails" id="closureDetails" value={formData.closureDetails} onChange={handleChange} placeholder="Closure Details" />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Issue Category:</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select Category</option>
                        <option value="System Related Query">System Related Query</option>
                        <option value="Dialer Related Query">Dialer Related Query</option>
                        <option value="Heat Set Issue">Head Set Issue</option>
                        <option value="Internet Issue">Internet Issue</option>
                        <option value="Wrong Data Issue">Wrong Data Issue</option>
                        <option value="Aws Bill">Aws Bill</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="4" cols="50" />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default UserForm;
