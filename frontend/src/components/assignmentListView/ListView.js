// src/ListView.js
import React from 'react';
import styles  from './ListView.module.css';
import { useNavigate } from 'react-router-dom';
import Checkmark from '../checkmark/checkmark';
import toolbox from '../../assets/images/toolbox.jpg';
import TaskCard from '../taskCard/TaskCard';


const ListView = ({ tasks }) => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleEditClick = (taskId) => {
    navigate(`/task/edit/${taskId}`);
  };

  return (
    <div className={styles.listview}>
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} onTaskClick={handleTaskClick} onEditClick={handleEditClick}  />
      ))}
    </div>
  );
};

export default ListView;
