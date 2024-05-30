import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRecord.css';
import DataTable from './DataTable';
import StatusLegend from './StatusLegend';
import FilterPage from './FilterPage'; // Import the FilterPage component

const CreditRecord = () => {
    const [formDataList, setFormDataList] = useState([]);
    const [filteredDataList, setFilteredDataList] = useState([]);
    const [editedDataIndex, setEditedDataIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [filters, setFilters] = useState({
        empName: '',
        empId: '',
        dateCreated: '',
        status: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.235.164.94:5000/api/creditrecord');
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
            setFilteredDataList(updatedData);
            await axios.post('http://13.235.164.94:5000/api/update-creditdata', editedData);

            setEditedDataIndex(null);
            setEditedData({});
        } catch (error) {
            console.error('Error saving edit', error);
        }
    };

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
             const priorityMatch = filters.priority ? item.priority === filters.priority : true;
            

            return empNameMatch && empIdMatch && dateCreatedMatch && statusMatch && priorityMatch;
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
            <h2>CREDIT FORM DATA LIST</h2>
            <StatusLegend />
            <FilterPage
                filters={filters}
                setFilters={setFilters}
                uniqueValues={uniqueValues}
                handleFilterChange={handleFilterChange}
                clearFilters={clearFilters}
            />
            <DataTable
                filteredDataList={filteredDataList}
                getStatusColor={getStatusColor}
                editedDataIndex={editedDataIndex}
                handleEditData={handleEditData}
                handleEditDataChange={handleEditDataChange}
                handleSaveEditedData={handleSaveEditedData}
                editedData={editedData}
            />
        </div>
    );
};

export default CreditRecord;
