import React, { useRef } from 'react';
import './EditTask.css';
import TextBox from '../../components/textBox/textBox';
import TimelineTextBox from '../../components/timelineTextBox/timelineTextBox';

import { useParams } from 'react-router-dom';
    const EditTask = ({ task }) => {
        const taskRef = useRef({
            name: task.name,
            description: task.description,
            checkupFrequency: task.checkupFrequency,
            personalNotes: task.personalNotes,
            startDate: task.startDate,
            endDate: task.endDate,
        });

        const handleTextChange = (id, newText) => {
            taskRef.current[id] = newText;
        };

        const handleSubmit = () => {
            const updatedTask = taskRef.current;
            console.log('Submitted', updatedTask);
            alert(`Submitted tasks: ${JSON.stringify(updatedTask, null, 6)}`);
        };

        return (
            <div className='main-container'>
                <h1 className='task-title'>Edit Task</h1>
                <div className='task-container'>
                    <div className='task-info-container'>
                        <TextBox
                            id='name'
                            header='Task Name'
                            text={taskRef.current.name}
                            editable={true}
                            onTextChange={handleTextChange}
                        />
                        <TextBox
                            id='description'
                            header='Description'
                            text={taskRef.current.description}
                            editable={true}
                            width='auto'
                            height='150px'
                            onTextChange={handleTextChange}
                        />
                        <TextBox
                            id='checkupFrequency'
                            header='Checkup Frequency'
                            text={taskRef.current.checkupFrequency}
                            editable={true}
                            onTextChange={handleTextChange}
                        />
                        <TextBox
                            id='personalNotes'
                            header='Personal Notes'
                            text={taskRef.current.personalNotes}
                            editable={true}
                            width='auto'
                            height='150px'
                            onTextChange={handleTextChange}
                        />
                    </div>
                    <div className='timeline-container'>
                        <TimelineTextBox
                            startDate={taskRef.current.startDate}
                            endDate={taskRef.current.endDate}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    };