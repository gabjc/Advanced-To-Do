// src/ListView.js
import React from 'react';
import './ListView.css';
import { useNavigate } from 'react-router-dom';
import Checkmark from '../checkmark/checkmark';
import toolbox from '../../assets/images/toolbox.jpg';


const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card">

      
      <img  className='task-picture' src={toolbox} alt="toolbox" />
      <div className='task-info'>
        <div className='task-description'> 
          <div className="task-name">{task.name}</div>
          <div className="task-date">{task.date}</div>
        </div>
        <div className='task-buttons'>
          <button className='edit-button' onClick={() => onClick(task.id)}>Edit</button>
          <Checkmark />
        </div>
      </div>
    </div>
  );
};


const ListView = ({ tasks }) => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="list-view">
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} onClick={handleTaskClick} />
      ))}
    </div>
  );
};

export default ListView;
