// src/ListView.js
import React from 'react';
import './ListView.css';
import { useNavigate } from 'react-router-dom';


const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card" onClick={() => onClick(task.id)}>
      <div className="task-name">{task.name}</div>
      <div className="task-date">{task.date}</div>
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
