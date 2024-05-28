import React from 'react';
import './timelineTextBox.css';
const TimelineTextBox = ({startDate, endDate}) => {
    return (
        <div className="full-timeline-container">
            <h2 className="timeline-header">Timeline</h2>
            <div className="timeline-text-box-container">
                <div className='timeline-text-box-left'>
                    <p className='timeline-text'>Start Date</p>
                    <div className='timeline-text-box-date'>{startDate}</div>
                </div>
                <div className='timeline-text-box-right'>
                    <p className='timeline-text'>End Date</p>
                    <div className='timeline-text-box-date'>{endDate}</div>
                </div>
            </div>
        </div>
    );
};

export default TimelineTextBox;
