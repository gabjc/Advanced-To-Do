import React from 'react';
import './AssignmentView.css';
import TextBox from '../../components/textBox/textBox';
import TimelineTextBox from '../../components/timelineTextBox/timelineTextBox';
const AssignmentView = ({ task }) => {
    return (
        <div className='main-container'>
            <h1 className='task-title'>{task.name}</h1>
            <div className='task-container'>
            <div className='task-info-container'>
                
                <TextBox header='Description' text={task.description} />
                <TextBox header='Date' text={task.date} />
                <TextBox header='Personal Notes' text={task.personalNotes} />
            </div>
        <div className='timeline-container'>
         <TimelineTextBox startDate={task.startDate} endDate={task.endDate}/>
         </div>
         </div>
        </div>
    );
};

export default AssignmentView;