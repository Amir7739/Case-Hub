import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import './FetchRecord.css';
import StatusLegend from './StatusLegend';
import { FaFilter } from 'react-icons/fa';

const UserStatus = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [editedDataIndex, setEditedDataIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [authEmpId, setAuthEmpId] = useState(null);

    const [filteredDataList, setFilteredDataList] = useState([]);
    const [filters, setFilters] = useState({
        empName: '',
        empId: '',
        dateCreated: '',
        status: '',
        priority: '',
        assignedTo: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (authEmpId) {
            fetchData();
        }
    }, [authEmpId]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://13.235.164.94:5000/api/userstatus');
            const userFilteredData = response.data.filter(formData => formData.empId === authEmpId); // Filter data based on authEmpId
            setFormDataList(userFilteredData);
            setFilteredDataList(userFilteredData);
        } catch (error) {
            console.error('Error fetching form data:', error);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [filters, formDataList]); // Apply filters whenever filter state or formDataList changes

    const handleFilterChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value
        });
    };

    const applyFilters = () => {
        const filteredData = formDataList.filter(item => { // Apply filters to formDataList which is already filtered by authEmpId
            const dateCreatedMatch = filters.dateCreated ? new Date(item.dateCreated).toISOString().split('T')[0] === filters.dateCreated : true;
            const statusMatch = filters.status ? item.status === filters.status : true;
            const priorityMatch = filters.priority ? item.priority === filters.priority : true;
            const assignedToMatch = filters.assignedTo ? item.assignedTo === filters.assignedTo : true;

            return dateCreatedMatch && statusMatch && priorityMatch && assignedToMatch;
        });
        setFilteredDataList(filteredData);
    };

    const clearFilters = () => {
        setFilters({
            empName: '',
            empId: '',
            dateCreated: '',
            status: '',
            priority: '',
            assignedTo: '',
        });
        setFilteredDataList(formDataList); // Reset to original data list after clearing filters
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
            setFilteredDataList(updatedData);
            await axios.post('http://13.235.164.94:5000/api/update-user', editedData);

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

    const uniqueValues = (field) => {
        return [...new Set(formDataList.map(item => item[field]))];
    };

    return (
        <div>
            {!authEmpId ? (
                <LoginPage onLogin={handleLogin} />
            ) : (
                <>
                    <h2>DATA LIST FOR USER {authEmpId}</h2>
                    <StatusLegend />
                    <div className="filter-container">
                        <FaFilter onClick={() => setShowFilters(!showFilters)} className="filter-icon" />
                        {showFilters && (
                            <div className="filter-options">
                                <input
                                    type="date"
                                    value={filters.dateCreated}
                                    onChange={(e) => handleFilterChange('dateCreated', e.target.value)}
                                />
                                <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                                    <option value="">Choose Status</option>
                                    {uniqueValues('status').map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <select value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
                                    <option value="">Choose Priority</option>
                                    {uniqueValues('priority').map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                                <select value={filters.assignedTo} onChange={(e) => handleFilterChange('assignedTo', e.target.value)}>
                                    <option value="">Choose Department</option>
                                    {uniqueValues('assignedTo').map(assignedTo => (
                                        <option key={assignedTo} value={assignedTo}>{assignedTo}</option>
                                    ))}
                                </select>
                                <button className='clear-btn' onClick={clearFilters}>Clear Filters</button>
                            </div>
                        )}
                    </div>
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
                                <th>USER STATUS</th>
                                <th>FEEDBACK</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDataList.map((formData, index) => (
                                <tr key={formData._id} style={{ backgroundColor: getStatusColor(formData.status) }}>
                                    <td>{formData.ticketId}</td>
                                    <td>{formData.empId}</td>
                                    <td>{formData.empName}</td>
                                    <td>{formData.email}</td>
                                    <td>{new Date(formData.dateCreated).toLocaleString('en-IN')}</td>
                                    <td>
                                        {formData.resolveDate ? (
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
                                            <select
                                                value={editedData.userStatus}
                                                onChange={(e) => handleEditDataChange('userStatus', e.target.value)}
                                            >
                                                <option value="">Choose issue resolve or not</option>
                                                <option value="ThankYou, It's Resolve😊">ThankYou, It's Resolve😊</option>
                                                <option value="No, Still looking out for a resolution😔">No, Still looking out for a resolution😔</option>
                                            </select>
                                        ) : (
                                            formData.userStatus
                                        )}
                                    </td>
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
