// FetchRecord.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';

const HrFetchRecords = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [editedDataIndex, setEditedDataIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [fildata, setFilData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hrrecord');
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
        setEditedData({
            ...editedData,
            [field]: value,
        });
    };

    const handleSaveEditedData = async (index) => {
        try {
            const updatedData = [...formDataList];
            updatedData[index] = editedData;
            setFormDataList(updatedData);
            await axios.post('http://localhost:5000/api/update-hrdata', editedData);

            setEditedDataIndex(null);
            setEditedData({});
        } catch (error) {
            console.error('Error saving edit', error);
        }
    };

    return (
        <div>
            <h2>FORM DATA LIST</h2>
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
                        <th>ASSIGNEDTO</th>
                        <th>DESCRIPTION</th>
                        <th>CASE STATUS</th>
                        <th>COMMENTS</th>
                        {/* <th>FEEDBACK</th> */}
                        <th>EDIT</th>

                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((formData, index) => (
                        <tr key={formData._id} className={formData.status === 'RESOLVE' ? 'green-row' : formData.status === 'PENDING' ? 'yellow-row' : ''}>
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
                                {editedDataIndex === index ? (
                                    <div>
                                        {/* Input for selecting date */}
                                        <input
                                            type="date" // Use date input type to select date only
                                            value={editedData.resolveDate.split('T')[0]} // Extract date from resolveDate
                                            onChange={(e) => handleEditDataChange('resolveDate', e.target.value)}
                                        />
                                        {/* Display current time */}
                                        {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' })}
                                    </div>
                                ) : formData.resolveDate ? (
                                    // Display resolved date in Indian Standard Time
                                    <>
                                        {new Date(formData.resolveDate)
                                            .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' })}
                                        <br />
                                        {/* Display current time alongside the selected date */}
                                        {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', timeZoneName: 'short' })}
                                    </>
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

                            {/* <td>
                                {editedDataIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedData.feedback}
                                        onChange={(e) => handleEditDataChange('feedback', e.target.value)}
                                    />
                                ) : (
                                    formData.feedback
                                )}
                            </td> */}

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

export default HrFetchRecords;
