import React from 'react';
import styles from './Home.module.css';
import TopNavBar from '../../components/topNavBar/TopNavBar';
const Home = () => {
  return (
    
    <div className={styles.container}>
      <TopNavBar />
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <p className={styles.description}>This is the home page of the application.</p>
    </div>
  );
};

export default Home;
