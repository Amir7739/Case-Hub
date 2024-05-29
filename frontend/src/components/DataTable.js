import React from 'react';

const DataTable = ({ filteredDataList, getStatusColor, editedDataIndex, handleEditData, handleEditDataChange, handleSaveEditedData, editedData }) => {
    return (
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
                        <td>{formData.userStatus}</td>
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
    );
};

export default DataTable;
