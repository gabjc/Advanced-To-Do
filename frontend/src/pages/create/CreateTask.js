import React, { useRef } from 'react';
import './CreateTask.css';
import TextBox from '../../components/textBox/textBox';
import TimelineTextBox from '../../components/timelineTextBox/timelineTextBox';

const CreateTask = () => {
    // Using useRef to store the task values without causing re-renders
    const taskRef = useRef({
        name: '',
        description: '',
        checkupFrequency: '',
        personalNotes: '',
        startDate: '',
        endDate: '',
    });

    const handleTextChange = (id, newText) => {
        // Directly updating the ref object
        taskRef.current[id] = newText;  
    };

    const handleSubmit = () => {
        const task = taskRef.current;
        console.log('Submitted' + task.name + task.description + task.checkupFrequency + task.personalNotes + task.startDate + task.endDate);
        alert(`Submitted tasks: ${JSON.stringify(task, null, 6)}`);
    };

    return (
        <div className='main-container'>
            <h1 className='task-title'>Create Task</h1>
            <div className='task-container'>
                <div className='task-info-container'>
                    <TextBox id='name' header='Task Name' text={taskRef.current.name} editable={true}  onTextChange={handleTextChange}/>
                    <TextBox id='description' header='Description' text={taskRef.current.description} editable={true} width='auto' height='150px' onTextChange={handleTextChange} />
                    <TextBox id='checkupFrequency' header='Checkup Frequency' text={taskRef.current.checkupFrequency} editable={true} onTextChange={handleTextChange} />
                    <TextBox id='personalNotes' header='Personal Notes' text={taskRef.current.personalNotes} editable={true} width='auto' height='150px' onTextChange={handleTextChange}/>
                </div>
                <div className='timeline-container'>
                    <TimelineTextBox id='date' startDate={taskRef.current.startDate} endDate={taskRef.current.endDate} editable={true} onTextChange={handleTextChange}/>
                    <button className='submit-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
