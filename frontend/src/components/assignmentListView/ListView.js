// src/ListView.js
import React from 'react';
import styles  from './ListView.module.css';
import { useNavigate } from 'react-router-dom';
import Checkmark from '../checkmark/checkmark';
import toolbox from '../../assets/images/toolbox.jpg';


const TaskCard = ({ task, onClick }) => {
  return (
    <div className={styles.taskcard}>

      
      <img  className={styles.picture} src={toolbox} alt="toolbox" />
      <div className={styles.taskinfo}>
        <div className={styles.taskdescription}> 
          <div className={styles.taskname}>{task.name}</div>
          <div className={styles.taskdate}>{task.date}</div>
        </div>
        <div className={styles.taskbuttons}>
          <button className={styles.editbutton} onClick={() => onClick(task.id)}>Edit</button>
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
    <div className={styles.listview}>
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} onClick={handleTaskClick} />
      ))}
    </div>
  );
};

export default ListView;
