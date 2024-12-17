// src/ListView.js
import React from 'react';
import styles  from './TaskCard.module.css';
import { useNavigate } from 'react-router-dom';
import Checkmark from '../checkmark/checkmark';
import toolbox from '../../assets/images/toolbox.jpg';


const TaskCard = ({ task, onTaskClick, onEditClick }) => {
  return (
    <div className={styles.taskcard}>

      
      <img  className={styles.picture} src={toolbox} alt="toolbox" />
      <div className={styles.taskinfo}>
        <div className={styles.taskdescription} onClick={() => onTaskClick(task.id)}> 
          <div className={styles.taskname}>{task.name}</div>
          <div className={styles.taskdate}>{task.date}</div>
        </div>
        <div className={styles.taskbuttons}>
          <button className={styles.editbutton} onClick={() => onEditClick(task.id)}>Edit</button>
          <Checkmark />
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 