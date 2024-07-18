// Checkmark.js
import React, { useState } from 'react';
import './checkmark.css';

const Checkmark = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="container">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkmark;
