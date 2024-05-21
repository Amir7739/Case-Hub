// FetchRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';

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




    return (
        <div>
            <h2>CEO FORM DATA LIST</h2>
            <table>
                <thead>
                    <tr>
                        <th>TICKET ID</th>
                        <th>EMP ID</th>
                        <th>EMP NAME</th>
                        <th>EMP Email</th>
                        <th>DATE CREATED</th>
                        <th>Resolve Date</th>
                        <th>PRIORITY</th>
                        <th>CATEGORY</th>
                        <th>DEPARTMENT</th>
                        <th>DESCRIPTION</th>
                        <th>CASE STATUS</th>
                        <th>COMMENTS</th>
                        <th>FEEDBACK</th>
                       

                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((formData, index) => (
                        <tr key={formData._id} style={{ backgroundColor: formData.status === 'RESOLVE' ? 'lightgreen' : formData.status === 'PENDING' ? 'yellow' : '' }}>
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
