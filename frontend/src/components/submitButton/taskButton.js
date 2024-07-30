import React from 'react';
import styles from './taskButton.module.css';
const TaskButton = ({ text,handleSubmit }) => {
    return (
        <button className={styles.button} onClick={handleSubmit}>
            {text}
        </button>
    );
};

export default TaskButton;