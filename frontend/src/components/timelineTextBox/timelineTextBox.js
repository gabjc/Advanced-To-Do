import React from 'react';
import './timelineTextBox.css';
const TimelineTextBox = ({id, editable=false,onTextChange = null, startDate, endDate}) => {

    const handleInput = (event) => {
        if (!editable) {
            return;
        }
        if (onTextChange) {
            onTextChange(id, event.currentTarget.textContent);
        }
    };
    return (
        <div className="full-timeline-container">
            <h2 className="timeline-header">Timeline</h2>
            <div className="timeline-text-box-container">
                <div className='timeline-text-box-left'>
                    <p className='timeline-text'>Start Date</p>
                    <div className='timeline-text-box-date'
                                contentEditable={editable}
                                onInput={handleInput}
                    >{startDate}</div>
                </div>
                <div className='timeline-text-box-right'>
                    <p className='timeline-text'>End Date</p>
                    <div className='timeline-text-box-date'
                                contentEditable={editable}
                                onInput={handleInput}
                    >{endDate}</div>
                </div>
            </div>
        </div>
    );
};

export default TimelineTextBox;
