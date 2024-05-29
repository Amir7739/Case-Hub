// FetchRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';
import StatusLegend from './StatusLegend';
import { FaFilter } from 'react-icons/fa';

const CeoFetchRecord = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [filteredDataList, setFilteredDataList] = useState([]);
    const [filters, setFilters] = useState({
        empName: '',
        empId: '',
        dateCreated: '',
        status: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.235.164.94:5000/api/ceostatus');
                setFormDataList(response.data);
                setFilteredDataList(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters]);

   

    const handleFilterChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value
        });
    };

    const applyFilters = () => {
        const filteredData = formDataList.filter(item => {
            const empNameMatch = filters.empName ? item.empName === filters.empName : true;
            const empIdMatch = filters.empId ? item.empId.toString() === filters.empId : true;
            const dateCreatedMatch = filters.dateCreated ? new Date(item.dateCreated).toISOString().split('T')[0] === filters.dateCreated : true;
            const statusMatch = filters.status ? item.status === filters.status : true;

            return empNameMatch && empIdMatch && dateCreatedMatch && statusMatch;
        });
        setFilteredDataList(filteredData);
    };

    const clearFilters = () => {
        setFilters({
            empName: '',
            empId: '',
            dateCreated: '',
            status: ''
        });
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
            case 'ESCALATED':
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
            <h2>DIRECTOR FORM DATA LIST</h2>
            <StatusLegend />
            <div className="filter-container">
                <FaFilter onClick={() => setShowFilters(!showFilters)} className="filter-icon" />
                {showFilters && (
                    <div className="filter-options">
                        <select value={filters.empName} onChange={(e) => handleFilterChange('empName', e.target.value)}>
                            <option value="">Employee Name</option>
                            {uniqueValues('empName').map(empName => (
                                <option key={empName} value={empName}>{empName}</option>
                            ))}
                        </select>
                        <select value={filters.empId} onChange={(e) => handleFilterChange('empId', e.target.value)}>
                            <option value="">Employee ID</option>
                            {uniqueValues('empId').map(empId => (
                                <option key={empId} value={empId}>{empId}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={filters.dateCreated}
                            onChange={(e) => handleFilterChange('dateCreated', e.target.value)}
                        />
                        <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                            <option value="">Status</option>
                            {uniqueValues('status').map(status => (
                                <option key={status} value={status}>{status}</option>
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
                        <th>DEPARTMENT</th>
                        <th>DESCRIPTION</th>
                        <th>ISSUE STATUS</th>
                        <th>COMMENTS</th>
                        <th>USER STATUS</th>
                        <th>FEEDBACK</th>
                      
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
                                    new Date(formData.resolveDate).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        timeZoneName: 'short',
                                        hour12: false,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
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
                            <td>{formData.userStatus}</td>
                            <td>{formData.feedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default CeoFetchRecord;
