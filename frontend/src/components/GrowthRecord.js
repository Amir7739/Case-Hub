// FetchRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';
import StatusLegend from './StatusLegend';

const GrowthRecord = () => {
    
    const [formDataList, setFormDataList] = useState([]);
    const [editedDataIndex, setEditedDataIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.235.164.94:5000/api/growthrecord');
                setFormDataList(response.data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditData = (index) => {
        setEditedDataIndex(index);
        setEditedData({ ...formDataList[index] });
    };

    const handleEditDataChange = (field, value) => {
        // Update resolveDate when any other field is edited
        const updatedData = {
            ...editedData,
            [field]: value,
        };
        if (field !== 'resolveDate') {
            updatedData.resolveDate = new Date().toISOString(); // Update resolveDate to current date and time
        }
        setEditedData(updatedData);
    };

    const handleSaveEditedData = async (index) => {
        try {
            const updatedData = [...formDataList];
            updatedData[index] = editedData;
            setFormDataList(updatedData);
            await axios.post('http://13.235.164.94:5000/api/update-growthdata', editedData);

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
            case 'ESCALATED':
                return 'lightcoral';
            default:
                return '';
        }
    };

    return (
        <div>
            <h2>GROWTH FORM DATA LIST</h2>
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
                        <th>EDIT</th>

                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((formData, index) => (
                         <tr key={formData._id} style={{ backgroundColor: getStatusColor(formData.status) }}>
                            <td>
                                {/* {editedDataIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedData.ticketId}
                                        onChange={(e) => handleEditDataChange('ticketId', e.target.value)}
                                    />
                                ) : (
                                    formData.ticketId
                                )} */}
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
                            {/* <td>{formData.category}</td> */}
                            <td>
                                {formData.category}
                            </td>
                            <td>{formData.assignedTo}</td>
                            <td>{formData.description}</td>

                            <td>
                                {editedDataIndex === index ? (
                                    <select
                                        value={editedData.status}
                                        onChange={(e) => handleEditDataChange('status', e.target.value)}
                                    >
                                       <option value="">Choose status</option>
                                        <option value="RESOLVE">RESOLVE</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="IN PROGRESS">IN PROGRESS</option>
                                        <option value="ESCALATED">ESCALATED</option>
                                    </select>
                                ) : (
                                    formData.status
                                )}
                            </td>


                            <td>
                                {editedDataIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedData.comments}
                                        onChange={(e) => handleEditDataChange('comments', e.target.value)}
                                    />
                                ) : (
                                    formData.comments
                                )}
                            </td>

                            <td>{formData.feedback}</td>

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
        </div>
    );
};

export default GrowthRecord;
