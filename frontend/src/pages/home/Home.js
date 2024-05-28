import React from 'react';
import styles from './Home.module.css';
import TopNavBar from '../../components/topNavBar/TopNavBar';
import ListView from '../../components/assignmentListView/ListView';
const Home = () => {
  const streakCount = 0;
  const tasks = [
    { name: 'Task 1', date: '2024-05-23' },
    { name: 'Task 2', date: '2024-05-24' },
    { name: 'Task 3', date: '2024-05-25' },
    { name: 'Task 4', date: '2024-05-26' },
  ];
  
  return (
    
    <div className={styles.container}>
      
      <h1 className={styles.title}>Assignments</h1>
      <h1 className={styles.subheading}>Streaks: {streakCount} </h1>
      <div className="calender-view">Calender View</div>
      <div className="assignments-container">Assignments</div>
      <ListView tasks={tasks} />

    </div>
  );
};

export default Home;
