import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
const FilterPage = ({ filters, setFilters, uniqueValues, handleFilterChange, clearFilters }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>
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
                            className='date-input'
                        />
                        <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                            <option value="">Status</option>
                            {uniqueValues('status').map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                         <select value={filters.priority} onChange={(e) => handleFilterChange('priority', e.target.value)}>
                            <option value="">Priority</option>
                            {uniqueValues('priority').map(priority => (
                                <option key={priority} value={priority}>{priority}</option>
                            ))}
                        </select>
                        <button className='clear-btn' onClick={clearFilters}>Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterPage;
