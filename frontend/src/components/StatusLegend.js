// StatusLegend.js

import React from 'react';
import './StatusLegend.css';

const StatusLegend = () => {
    return (
        <div className="color-legend">
            <span className="color-dot" style={{ backgroundColor: 'lightgreen' }}></span> RESOLVE
            <span className="color-dot" style={{ backgroundColor: 'yellow' }}></span> PENDING
            <span className="color-dot" style={{ backgroundColor: 'lightblue' }}></span> IN PROGRESS
            <span className="color-dot" style={{ backgroundColor: 'orange' }}></span> ON HOLD
            <span className="color-dot" style={{ backgroundColor: 'lightcoral' }}></span> ESCALATED
        </div>
    );
};

export default StatusLegend;
