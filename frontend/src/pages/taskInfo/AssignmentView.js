import React from 'react';
import './AssignmentView.css';
import TextBox from '../../components/textBox/textBox';
import TimelineTextBox from '../../components/timelineTextBox/timelineTextBox';
import TaskButton from '../../components/submitButton/taskButton';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// TODO: ACTUALLY PARSE THROUGH DATABASE AND GET THE TASKS
const getTaskById = (taskId) => {
    const tasks = [
      { id: 1, name: 'Task 1', description: 'This is task 1', personalNotes: 'This is my personal note', startDate: '2024-05-23', endDate: '2024-05-24' },
      { id: 2, name: 'Task 2', description: 'This is task 2', personalNotes: 'This is my personal note', startDate: '2024-05-24', endDate: '2024-05-25' },
      { id: 3, name: 'Task 3', description: 'This is task 3', personalNotes: 'This is my personal note', startDate: '2024-05-25', endDate: '2024-05-26' },
      { id: 4, name: 'Task 4', description: 'This is task 4', personalNotes: 'This is my personal note', startDate: '2024-05-26', endDate: '2024-05-27' },
    ];
    return tasks.find(task => task.id === parseInt(taskId));
  };
  



const AssignmentView = () => {
    const { taskId } = useParams();
    const task = getTaskById(taskId);

    const navigate = useNavigate();
  
    if (!task) {
      return <div>Task not found</div>;
    }

    const startTimer = () => {
        
        console.log('Submitted');
        navigate(`/task/${taskId}/timer`);
    };
    return (
        <div className='main-container'>
            <h1 className='task-title'>{task.name}</h1>
                <div className='task-container'>
                    <div className='task-info-container'>                
                        <TextBox header='Description' text={task.description} />
                        <TextBox header='Checkup Frequency' text={'something here'} />
                        <TextBox header='Personal Notes' text={task.personalNotes} />
                    </div>
                    <div className='timeline-container'>
                        <TimelineTextBox startDate={task.startDate} endDate={task.endDate}/>
                        <TaskButton text='Start' handleSubmit={startTimer}/>
                    </div>
                </div>
        </div>
    );
};

export default AssignmentView;