import React from 'react';

function Filters({ onFilterChange }) {
    const handleChange = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="mb-3">
            <label htmlFor="filter" className="form-label">Filter By</label>
            <select id="filter" className="form-select" onChange={handleChange}>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
            </select>
        </div>
    );
}

export default Filters;