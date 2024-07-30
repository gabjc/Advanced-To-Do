// Checkmark.js
import React, { useState } from 'react';
import styles from './checkmark.module.css';

const Checkmark = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    //TODO send a request to the backend to update the status of the task
  };

  return (
    <label className={styles.container}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkmark;
