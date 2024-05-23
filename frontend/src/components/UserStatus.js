import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import './FetchRecord.css';
import StatusLegend from './StatusLegend';

const UserStatus = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [editedDataIndex, setEditedDataIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [authEmpId, setAuthEmpId] = useState(null); // State to hold authenticated empId

    useEffect(() => {
        if (authEmpId) {
            fetchData();
        }
    }, [authEmpId]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/userstatus');
            setFormDataList(response.data.filter(formData => formData.empId === authEmpId));
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    const handleLogin = (empId) => {
        setAuthEmpId(empId);
    };

    const handleEditData = (index) => {
        setEditedDataIndex(index);
        setEditedData({ ...formDataList[index] });
    };

    const handleEditDataChange = (field, value) => {
        setEditedData({
            ...editedData,
            [field]: value,
        });
    };

    const handleSaveEditedData = async (index) => {
        try {
            const updatedData = [...formDataList];
            updatedData[index] = editedData;

            // Assuming authentication is already done, directly update data
            setFormDataList(updatedData);

            await axios.post('http://localhost:5000/api/update-user', editedData);

            setEditedDataIndex(null);
            setEditedData({});
        } catch (error) {
            console.error('Error saving edit', error);
        }
    };

     const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVE':
                return 'lightgreen';
            case 'PENDING':
                return 'yellow';
            case 'IN PROGRESS':
                return 'lightblue';
            case 'ON HOLD':
                return 'orange';
            case 'REJECTED':
                return 'lightcoral';
            default:
                return '';
        }
    };

    return (
        <div>
            {!authEmpId ? (
                <LoginPage onLogin={handleLogin} />
            ) : (
                <>
                        <h2>DATA LIST FOR USER {authEmpId}</h2>
                         <StatusLegend/>
                    <table>
                        <thead>
                            <tr>
                                <th>TICKET ID</th>
                                <th>EMP ID</th>
                                <th>EMP NAME</th>
                                <th>EMP Email</th>
                                <th>DATE CREATED</th>
                                <th>RESOLVE DATE</th>
                                <th>PRIORITY</th>
                                <th>CATEGORY</th>
                                <th>ASSIGNEDTO</th>
                                <th>DESCRIPTION</th>
                                <th>CASE STATUS</th>
                                <th>COMMENTS</th>
                                <th>FEEDBACK</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formDataList.map((formData, index) => (
                                <tr key={formData._id} style={{ backgroundColor: getStatusColor(formData.status) }}>
                                    <td>{formData.ticketId}</td>
                                    <td>{formData.empId}</td>
                                    <td>{formData.empName}</td>
                                    <td>{formData.email}</td>
                                    <td>{new Date(formData.dateCreated).toLocaleString('en-IN')}</td>
                                    <td>
                                {formData.resolveDate ? (
                                    // Display both date and time in Indian Standard Time
                                    new Date(formData.resolveDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                                ) : (
                                    '-'
                                )}
                            </td>
                                    <td>{formData.priority}</td>
                                    <td>{formData.category}</td>
                                    <td>{formData.assignedTo}</td>
                                    <td>{formData.description}</td>
                                    <td>{formData.status}</td>
                                    <td>{formData.comments}</td>
                                    <td>
                                        {editedDataIndex === index ? (
                                            <input
                                                type="text"
                                                value={editedData.feedback}
                                                onChange={(e) => handleEditDataChange('feedback', e.target.value)}
                                            />
                                        ) : (
                                            formData.feedback
                                        )}
                                    </td>
                                    <td>
                                        {editedDataIndex === index ? (
                                            <button className="save-btn" onClick={() => handleSaveEditedData(index)}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="edit-btn" onClick={() => handleEditData(index)}>
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default UserStatus;
