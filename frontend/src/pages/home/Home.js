import React from 'react';
import styles from './Home.module.css';
import TopNavBar from '../../components/topNavBar/TopNavBar';
import ListView from '../../components/assignmentListView/ListView';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const streakCount = 0;
  const tasks = [
    { id: 1, name: 'Task 1', date: '2024-05-23' },
    { id: 2, name: 'Task 2', date: '2024-05-24' },
    { id: 3, name: 'Task 3', date: '2024-05-25' },
    { id: 4, name: 'Task 4', date: '2024-05-26' },
  ];

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };
  
  return (
    
    <div className={styles.container}>
      <h1 className={styles.title}>Assignments</h1>
      <h1 className={styles.subheading}>Streaks: {streakCount} </h1>
      <div className="calender-view">Calender View</div>
      <div className="assignments-container">Assignments</div>
      <ListView tasks={tasks} onClick={handleTaskClick}/>
    </div>
  );
};

export default Home;
