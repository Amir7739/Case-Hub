// FetchRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';
import StatusLegend from './StatusLegend';

const CeoFetchRecord = () => {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ceostatus');
                setFormDataList(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);




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

    return (
        <div>
            <h2>CEO FORM DATA LIST</h2>
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
                        <th>DEPARTMENT</th>
                        <th>DESCRIPTION</th>
                        <th>ISSUE STATUS</th>
                        <th>COMMENTS</th>
                        <th>FEEDBACK</th>

                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((formData, index) => (
                         <tr key={formData._id} style={{ backgroundColor: getStatusColor(formData.status) }}>
                            <td>
                                {formData.ticketId}
                            </td>
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

                            <td>
                                {formData.category}
                            </td>
                            <td>{formData.assignedTo}</td>
                            <td>{formData.description}</td>

                            <td>
                                {formData.status}
                            </td>

                            <td>
                                {formData.comments}
                            </td>
                            <td>{formData.feedback}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CeoFetchRecord;
